import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'pull-up-assessment-report'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/assessment
   */
  assessmentService: Ember.inject.service('api-sdk/assessment'),

  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user invoke the pull up.
     **/
    onPullUpClose() {
      this.closePullUp();
    },

    onChooseGridView() {
      this.set('isGridView', true);
      this.set('isListView', false);
    },

    onChooseListView() {
      this.set('isGridView', false);
      this.set('isListView', true);
    },

    onToggleTimeSpentFlt() {
      this.toggleProperty('isTimeSpentFltApplied');
    },

    onToggleReactionFlt() {
      this.toggleProperty('isReactionFltApplied');
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  didInsertElement() {
    this.openPullUp();
    this.loadData();
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * ClassId belongs to this assessment report.
   * @type {String}
   */
  classId: Ember.computed.alias('context.classId'),

  /**
   * CourseId belongs to this assessment report.
   * @type {String}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Unit belongs to this assessment report.
   * @type {String}
   */
  unit: Ember.computed.alias('context.unitModel'),

  /**
   * Lesson belongs to this assessment report.
   * @type {[type]}
   */
  lesson: Ember.computed.alias('context.lessonModel'),

  /**
   * AssessmentId of this report.
   * @type {[type]}
   */
  assessmentId: Ember.computed.alias('context.collectionId'),

  /**
   * List of collection mapped to lesson.
   * @type {Array}
   */
  collections: Ember.computed.alias('context.collections'),

  /**
   * Selected collection.
   * @type {Array}
   */
  selectedCollection: Ember.computed.alias('context.collection'),

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * This property will get change based on view selection, by default grid view off.
   * @type {Boolean}
   */
  isGridView: false,

  /**
   * This property will get change based on view selection, by default list view  on.
   * @type {Boolean}
   */
  isListView: true,

  /**
   * This property will get change based on filter selection, by default reaction filter off.
   * @type {Boolean}
   */
  isReactionFltApplied: false,

  /**
   * This property will get change based on filter selection, by default timespent filter off.
   * @type {Boolean}
   */
  isTimeSpentFltApplied: false,

  /**
   * selected assessment object which will have other meta data's
   * @type {Object}
   */
  assessment: null,

  /**
   * List of class members
   * @type {Object}
   */
  classMembers: Ember.computed.alias('context.classMembers'),

  /**
   * Stutent performance report data
   * @type {Object}
   */
  studentPerformanceData: null,

  //--------------------------------------------------------------------------
  // Methods

  /**
   * Function to animate the  pullup from bottom to top
   */
  openPullUp() {
    let component = this;
    component.$().animate(
      {
        top: '10%'
      },
      850
    );
  },

  closePullUp() {
    let component = this;
    component.$().animate(
      {
        top: '100%'
      },
      850,
      function() {
        component.set('showPullUp', false);
      }
    );
  },

  loadData() {
    let component = this;
    let collectionId = component.get('selectedCollection.id');
    let unitId = component.get('unit.id');
    let lessonId = component.get('lesson.id');
    let courseId = component.get('courseId');
    let classId = component.get('classId');
    return Ember.RSVP.hash({
      assessment: component
        .get('assessmentService')
        .readAssessment(collectionId),
      performance: component
        .get('analyticsService')
        .findResourcesByCollection(
          classId,
          courseId,
          unitId,
          lessonId,
          collectionId,
          'assessment'
        )
    }).then(({ assessment, performance }) => {
      component.set('assessment', assessment);
      component.set('performance', performance);
      component.parseClassMemberAndPerformanceData();
    });
  },

  parseClassMemberAndPerformanceData() {
    let component = this;
    let classMembers = component.get('classMembers');
    let users = Ember.A([]);
    classMembers.forEach(member => {
      let user = Ember.Object.create({
        id: member.id,
        firstName: member.firstName,
        lastName: member.lastName,
        avatarUrl: member.avatarUrl
      });

      users.pushObject(user);
    });
    users = users.sortBy('lastName');
  }
});
