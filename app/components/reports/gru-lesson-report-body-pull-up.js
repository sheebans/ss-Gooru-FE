import Ember from 'ember';
import { formatTime } from '../../utils/utils';
import TaxonomyTag from 'gooru-web/models/taxonomy/taxonomy-tag';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

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

    filterByReportData: function(type) {
      let component = this;
      component.$('.data-filter').removeClass('active');
      component.$(`.${type}`).addClass('active');
      component.set('type', type);
      if (type === 'collection') {
        component.$('.performance').addClass('hide');
      } else {
        component.$('.performance').removeClass('hide');
      }
      component.getStudentPerformances();
    },

    timeSpentToggle() {
      let component = this;
      component.$('span.ts-actions').toggleClass('hide-score');
      component.$('.time-spent').toggleClass('disable-time');
    },

    sortByFirstName() {
      let component = this;
      component.toggleProperty('sortByFirstnameEnabled');
      if (component.get('sortByFirstnameEnabled')) {
        component.set(
          'tableRow',
          component.get('tableRow').sortBy('firstName')
        );
      } else {
        component.set(
          'tableRow',
          component
            .get('tableRow')
            .sortBy('firstName')
            .reverse()
        );
      }
    },

    sortByLastName() {
      let component = this;
      component.toggleProperty('sortByLastnameEnabled');
      if (component.get('sortByLastnameEnabled')) {
        component.set('tableRow', component.get('tableRow').sortBy('lastName'));
      } else {
        component.set(
          'memberPerformances',
          component
            .get('memberPerformances')
            .sortBy('lastName')
            .reverse()
        );
      }
    },

    sortByScore() {
      let component = this;
      component.toggleProperty('sortByScoreEnabled');
      if (component.get('sortByScoreEnabled')) {
        component.set(
          'tableRow',
          component.get('tableRow').sortBy('overAllScore')
        );
      } else {
        component.set(
          'tableRow',
          component
            .get('tableRow')
            .sortBy('overAllScore')
            .reverse()
        );
      }
    },

    onClickCollectionReport(collection, collections) {
      let component = this;
      let params = {
        classId: component.get('classId'),
        courseId: component.get('courseId'),
        unitId: component.get('unitId'),
        lessonId: component.get('lessonId'),
        collection: collection,
        lessonModel: component.get('lesson'),
        unitModel: component.get('unit'),
        collections: collections,
        classMembers: component.get('classMembers')
      };
      this.sendAction('teacherCollectionReport', params);
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
  classId: Ember.computed.alias('context.classId'),

  /**
   * Propery to show course id.
   * @property {courseId}
   */
  courseId: Ember.computed.alias('context.courseId'),

  /**
   * Propery to show unit id.
   * @property {unitId}
   */
  unitId: Ember.computed.alias('context.unitId'),

  /**
   * Propery to show lesson.
   * @property {unit}
   */
  unit: Ember.computed.alias('context.unit'),

  /**
   * Propery to show lesson id.
   * @property {lessonId}
   */
  lessonId: Ember.computed.alias('context.lessonId'),

  /**
   * Propery to show lesson.
   * @property {lesson}
   */
  lesson: Ember.computed.alias('context.lesson'),

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
   * Property to load the performance data
   */
  collections: Ember.A([]),

  /**
   * Property to assesslist data
   */
  classMembers: Ember.computed.alias('context.classMembers'),

  /**
   * Property to member performances data
   */
  memberPerformances: Ember.A([]),

  /**
   * Maintain the status of sort by firstName
   * @type {String}
   */
  sortByFirstnameEnabled: true,

  /**
   * Maintain the status of sort by lastName
   * @type {String}
   */
  sortByLastnameEnabled: false,

  /**
   * Maintain the status of sort by overAllScore
   * @type {String}
   */
  sortByScoreEnabled: false,

  /**
   * This attribute decide default sorting key
   * @type {String}
   */
  defaultSortCriteria: 'firstName',

  /**
   * @property {TaxonomyTag[]} List of taxonomy tags
   */
  tags: Ember.computed('assessment.standards.[]', function() {
    let standards = this.get('assessment.standards');
    if (standards) {
      standards = standards.filter(function(standard) {
        // Filter out learning targets (they're too long for the card)
        return !TaxonomyTagData.isMicroStandardId(standard.get('id'));
      });
      return TaxonomyTag.getTaxonomyTags(standards);
    }
  }),

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
   * Get the list of assessment list
   */
  getListOfAssessments() {
    const classId = this.get('classId');
    const courseId = this.get('courseId');
    const unitId = this.get('unitId');
    const lessonId = this.get('lessonId');
    let assessmentListPromise = new Ember.RSVP.resolve(
      this.get('lessonService').fetchById(courseId, unitId, lessonId)
    );
    let classMembers = this.get('classMembers');
    return Ember.RSVP.hash({
      studentAssessment: assessmentListPromise,
      performance: this.get(
        'performanceService'
      ).findClassPerformanceByUnitAndLesson(
        classId,
        courseId,
        unitId,
        lessonId,
        classMembers
      )
    }).then(function(hash) {
      let collections = hash.studentAssessment.children;
      let performance = hash.performance;
      collections.map(function(collection) {
        let collectionId = collection.get('id');
        const averageScore = performance.calculateAverageScoreByItem(
          collectionId
        );
        const timeSpent = performance.calculateAverageTimeSpentByItem(
          collectionId
        );
        const completionDone = performance.calculateSumCompletionDoneByItem(
          collectionId
        );
        const completionTotal = performance.calculateSumCompletionTotalByItem(
          collectionId
        );
        collection.set(
          'performance',
          Ember.Object.create({
            score: averageScore,
            hasStarted: averageScore > 0 || timeSpent > 0,
            isCompleted: completionDone > 0 && completionDone >= completionTotal
          })
        );
        return collection;
      });
      return collections;
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
    tableRow = tableRow.sortBy(component.get('defaultSortCriteria'));
    component.set('sortByLastnameEnabled', false);
    component.set('sortByFirstnameEnabled', true);
    component.set('sortByScoreEnabled', false);
    component.set('tableRow', tableRow);
  },

  /**
   * Generate the student data for filter
   */
  getStudentData() {
    let component = this;
    let performancePromise = component.getPerformances();
    let assessmentListPromise = component.getListOfAssessments();
    return Ember.RSVP.hash({
      performances: performancePromise,
      assessmentLists: assessmentListPromise
    }).then(function(hash) {
      let collections = hash.assessmentLists;
      let memberPerformances = hash.performances;
      component.set('memberPerformances', memberPerformances);
      component.set('collections', collections);
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
