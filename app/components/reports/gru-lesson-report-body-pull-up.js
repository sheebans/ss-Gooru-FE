import Ember from 'ember';
import { formatTime } from '../../utils/utils';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {LessonService} Service to retrieve lesson information
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-lesson-report-body-pull-up'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered when the user close the pull up.
     **/
    onPullUpClose() {
      this.set('showPullUp', false);
      this.set('showLessonReportPullUp', false);
    },

    sortStudents: function(criteria) {
      if (this.get('sortBy') !== criteria) {
        this.set('sortBy', criteria);
        this.set('reverseSort', false);
      } else {
        this.set('reverseSort', !this.get('reverseSort'));
      }
    },

    filterByReportData: function(type) {
      let component = this;
      component.$('.data-filter').removeClass('active');
      component.$(`.${type}`).addClass('active');
      component.set('type', type);
      component.$('.performance').css('cursor', 'not-allowed');
      component.getStudentPerformances();
    },

    timeSpentToggle() {
      let component = this;
      component.$('span.ts-actions').toggleClass('hide-score');
      component.$('.time-spent').toggleClass('disable-time');
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Propery to hide the default pullup.
   * @property {showPullUp}
   */
  showPullUp: false,

  /**
   * Propery to show header in pullup component.
   * @property {isShowHeader}
   */
  header: {
    isShowHeader: true
  },

  /**
   * Propery to show pullup body content.
   * @property {isShowBody}
   */
  body: {
    isShowBody: true
  },

  /**
   * Indicates the status of the spinner
   * @property {Boolean}
   */
  isLoading: false,

  /**
   * Propery to show class id.
   * @property {classId}
   */
  classId: '',

  /**
   * Propery to show course id.
   * @property {courseId}
   */
  courseId: '',

  /**
   * Propery to show unit id.
   * @property {unitId}
   */
  unitId: '',

  /**
   * Propery to show lesson id.
   * @property {lessonId}
   */
  lessonId: '',

  /**
   * Propery to show collection type.
   * @property {type}
   */
  type: 'assessment',

  /**
   * @param {Boolean} reverseSort - default sort in ascending order
   */
  reverseSort: false,

  /**
   * Propery to sort the score column.
   * @property {type}
   */
  sortByScore: 'sortBy',

  /**
   * Property to load the performance data
   */
  collections: Ember.A([]),

  /**
   * Property to assesslist data
   */
  classMembers: Ember.A([]),

  /**
   * Property to member performances data
   */
  memberPerformances: Ember.A([]),

  /**
   * Property to enable score , by default score is disabled
   */
  isScoreEnabled: false,

  /**
   * Property to enable reactions , by default reaction is disabled
   */
  isReactionEnabled: false,

  /**
   * Property to collection is active
   */
  isCollection: false,

  /**
   * Property to assessment is active
   */
  isAssessment: false,

  // -------------------------------------------------------------------------
  // Events
  didInsertElement() {
    let component = this;
    if (component.get('showPullUp')) {
      component.set('isLoading', true);
      component.getStudentData().then(function() {
        component.getStudentPerformances();
        component.set('isLoading', false);
      });
    }
  },

  didRender() {
    var component = this;

    //For table vertical aand horizondal scroll
    component.$('tbody').scroll(function() {
      //detect a scroll event on the tbody
      /*
      Setting the thead left value to the negative valule of tbody.scrollLeft will make it track the movement
      of the tbody element. Setting an elements left value to that of the tbody.scrollLeft left makes it maintain 			it's relative position at the left of the table.
      */
      component.$('thead').css('left', -component.$('tbody').scrollLeft()); //fix the thead relative to the body scrolling
      component
        .$('thead th:nth-child(1)')
        .css('left', component.$('tbody').scrollLeft()); //fix the first cell of the header
      component
        .$('tbody td:nth-child(1)')
        .css('left', component.$('tbody').scrollLeft()); //fix the first column of tdbody
    });
  },

  //--------------------------------------------------------------------------
  // Observer
  //

  /**
   * Observer to check the showPullUp property in component
   **/
  pullUpObserver: Ember.observer('showPullUp', function() {
    let component = this;
    if (component.get('showPullUp')) {
      component.getStudentData().then(function() {
        component.getStudentPerformances();
      });
    }
  }),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get the list of class members
   */
  getClassMembers() {
    let component = this;
    const classId = this.get('classId');
    return component
      .get('classService')
      .readClassMembers(classId)
      .then(function(members) {
        return members;
      });
  },

  /**
   * Get the list of assessment list
   */
  getListOfAssessments() {
    const courseId = this.get('courseId');
    const unitId = this.get('unitId');
    const lessonId = this.get('lessonId');
    let assessmentListPromise = new Ember.RSVP.resolve(
      this.get('lessonService').fetchById(courseId, unitId, lessonId)
    );
    return Ember.RSVP.hash({
      studentAssessment: assessmentListPromise
    }).then(function(hash) {
      return hash.studentAssessment.children;
    });
  },

  /**
   * Get the overall performance
   */
  getPerformances() {
    const classId = this.get('classId');
    const courseId = this.get('courseId');
    const unitId = this.get('unitId');
    const lessonId = this.get('lessonId');
    const type = this.get('type');
    let performancePromise = new Ember.RSVP.resolve(
      this.get('performanceService').getStudentsCollectionPerformance(
        classId,
        courseId,
        unitId,
        lessonId,
        type
      )
    );
    return Ember.RSVP.hash({
      studentPerformance: performancePromise
    }).then(function(hash) {
      return hash.studentPerformance;
    });
  },

  /**
   * Get the student performance
   */
  getStudentPerformances() {
    let component = this;
    let type = this.get('type');
    let memberPerformances = component.get('memberPerformances');
    let collections = component.get('collections');
    let filteredCollections = component.getContentByType(collections, type);
    let classMembers = component.get('classMembers');
    let tableRow = Ember.A([]);
    component.generateTableHeader(filteredCollections);
    classMembers.map(member => {
      let memberId = member.id;
      let fullName = `${member.lastName} ${member.firstName}`;
      let memberPerformance = memberPerformances.findBy('userId', memberId);
      let studentPerformances = memberPerformance
        ? memberPerformance.usageData.length > 0
          ? memberPerformance.usageData
          : null
        : null;
      let studentData = {
        fullName: fullName,
        thumbnail: member.avatarUrl,
        student: member,
        collections: Ember.A([])
      };

      let tableBody = Ember.A([]);
      filteredCollections.map(collection => {
        let studentCollectionPerformance = {
          score: null,
          timeSpent: null,
          status: null,
          collectionId: collection.id
        };
        if (studentPerformances) {
          let collectionPerformance = studentPerformances.findBy(
            'collectionId',
            collection.id
          );
          if (collectionPerformance) {
            let collectionTimeSpent = collectionPerformance.timeSpent
              ? formatTime(collectionPerformance.timeSpent)
              : null;
            studentCollectionPerformance = {
              score: collectionPerformance.scoreInPercentage,
              timeSpent: collectionTimeSpent,
              status: collectionPerformance.status,
              collectionId: collection.id
            };
          }
        }
        tableBody.push(studentCollectionPerformance);
      });
      studentData.collections = tableBody;
      tableRow.push(studentData);
    });
    component.set('tableRow', tableRow);
  },

  /**
   * Generate the student data for filter
   */
  getStudentData() {
    let component = this;
    let classMembersPromise = component.getClassMembers();
    let performancePromise = component.getPerformances();
    let assessmentListPromise = component.getListOfAssessments();
    return Ember.RSVP.hash({
      classMembers: classMembersPromise,
      performances: performancePromise,
      assessmentLists: assessmentListPromise
    }).then(function(hash) {
      let classMembers = hash.classMembers.members;
      let collections = hash.assessmentLists;
      let memberPerformances = hash.performances;
      component.set('memberPerformances', memberPerformances);
      component.set('collections', collections);
      component.set('classMembers', classMembers);
    });
  },

  /**
   * Generate the table header for student perfomance data
   */
  generateTableHeader(collections) {
    let component = this;
    let tableHeader = {
      student: 'STUDENT',
      collections: Ember.A([])
    };
    if (collections) {
      tableHeader.collections = collections;
    }
    component.set('tableHeader', tableHeader);
    return tableHeader;
  },

  /**
   * Get the content by type as collection or assessment
   */
  getContentByType(collections, type) {
    let filteredCollections = Ember.A([]);
    collections.map(collection => {
      if (collection.format === type) {
        filteredCollections.push(collection);
      }
    });
    return filteredCollections;
  }
});
