import Ember from 'ember';
import { EMOTION_VALUES } from 'gooru-web/config/config';

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
    },

    onClickPrev() {
      let component = this;
      let collections = component.get('collections');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = selectedElement.data('item-index') - 1;
      if (currentIndex === 0) {
        selectedIndex = collections.length - 1;
      }
      component.set('selectedCollection', collections.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('prev');
      component.loadData();
    },

    onClickNext() {
      let component = this;
      let collections = component.get('collections');
      let selectedElement = component.$(
        '#report-carousel-wrapper .item.active'
      );
      let currentIndex = selectedElement.data('item-index');
      let selectedIndex = currentIndex + 1;
      if (collections.length - 1 === currentIndex) {
        selectedIndex = 0;
      }
      component.set('selectedCollection', collections.objectAt(selectedIndex));
      component.$('#report-carousel-wrapper').carousel('next');
      component.loadData();
    },

    studentReport(collection, userId) {
      this.sendAction('studentReport', collection, userId);
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
  collections: Ember.computed('context.collections', function() {
    let collections = this.get('context.collections');
    return collections.filterBy('format', 'assessment');
  }),

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
  studentPerformanceData: Ember.A([]),

  /**
   * It maintains the state of loading
   * @type {Boolean}
   */
  isLoading: false,

  /**
   * This attribute decide sorting key
   * @type {String}
   */
  sortCriteria: 'firstName',

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
    component.set('isLoading', true);
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
      component.parseClassMemberAndPerformanceData(assessment, performance);
      component.set('isLoading', false);
    });
  },

  parseClassMemberAndPerformanceData(assessment, performance) {
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
      let questions = assessment.get('children');
      let userPerformance = performance.findBy('user', member.id);
      let resultSet = component.parsePerformanceQuestionAndUserData(
        questions,
        userPerformance
      );
      user.set('userPerformanceData', resultSet.userPerformanceData);
      user.set('overAllScore', resultSet.overAllScore);
      user.set('hasStarted', resultSet.hasStarted);
      users.pushObject(user);
    });
    users = users.sortBy(component.get('sortCriteria'));
    component.set('studentPerformanceData', users);
  },

  parsePerformanceQuestionAndUserData(questions, userPerformance) {
    let userPerformanceData = Ember.A([]);
    let numberOfCorrectAnswers = 0;
    let hasStarted = false;
    questions.forEach((question, index) => {
      let questionId = question.get('id');
      let performanceData = Ember.Object.create({
        id: question.get('id'),
        sequence: index + 1
      });
      if (userPerformance) {
        performanceData.set('hasStarted', true);
        hasStarted = true;
        let resourceResults = userPerformance.get('resourceResults');
        let resourceResult = resourceResults.findBy('resourceId', questionId);
        if (resourceResult) {
          let reaction = resourceResult.get('reaction');
          performanceData.set('reaction', reaction);
          if (reaction > 0) {
            let selectionEmotion = EMOTION_VALUES.findBy('value', reaction);
            performanceData.set('reaction_unicode', selectionEmotion.unicode);
          }
          if (resourceResult.get('correct')) {
            numberOfCorrectAnswers++;
          }
          performanceData.set('correct', resourceResult.get('correct'));
          performanceData.set('timeSpent', resourceResult.get('timeSpent'));
          performanceData.set('isSkipped', !resourceResult.get('userAnswer'));
        } else {
          performanceData.set('isSkipped', true);
        }
      } else {
        performanceData.set('hasStarted', false);
      }
      userPerformanceData.pushObject(performanceData);
    });
    let overAllScore = (numberOfCorrectAnswers / questions.length) * 100;
    let resultSet = {
      userPerformanceData: userPerformanceData,
      overAllScore: overAllScore,
      hasStarted: hasStarted
    };
    return resultSet;
  }
});
