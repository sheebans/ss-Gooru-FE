import Ember from 'ember';

/**
 * Class Overview controller
 *
 * Controller responsible of the logic for the class overview page
 */

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('teacher.class'),

  session: Ember.inject.service('session'),

  /**
   * @type {Service} performance service
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/course-map
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

  /**
   * Rescope Service to perform rescope data operations
   */
  rescopeService: Ember.inject.service('api-sdk/rescope'),

  // -------------------------------------------------------------------------
  // Attributes

  queryParams: ['location'],

  /**
   * Combination of unit, lesson and resource (collection or assessment)
   * separated by a plus sign
   * @example
   * location='uId001+lId002+cId003'
   */
  location: '',

  isFirstLoad: true,

  // -------------------------------------------------------------------------
  // Properties

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
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  class: Ember.computed.alias('classController.class'),

  /**
   * @property {Course} the selected course
   */
  course: null,

  /**
   * A link to the content visibility from class controller
   * @see controllers/class.js
   * @property {Class}
   */
  contentVisibility: Ember.computed.alias('classController.contentVisibility'),

  /**
   * @property {boolean} showWelcome - indicates the toggle welcome panel state, true means open, false means closed
   */
  showWelcome: true,

  /**
   * @property {boolean}
   * Property to find out is owner of the course or not
   */
  isOwner: Ember.computed('course', function() {
    let component = this;
    let loggedInUserId = component.get('session.userId');
    let courseOwnerId = component.get('course.owner.id');
    return loggedInUserId === courseOwnerId;
  }),

  /**
   * @type {Boolean}
   * Property to check whether a class is premium
   */
  isPremiumClass: Ember.computed('class', function() {
    let controller = this;
    const currentClass = controller.get('class');
    let setting = currentClass.get('setting');
    return setting ? setting['course.premium'] : false;
  }),

  isShowCoursePullup: false,

  /**
   * @property {Array} sortedStudents
   * Students list sorted by last name
   */
  sortedStudents: Ember.computed('classMembers', function() {
    let controller = this;
    let students = controller.get('classMembers');
    return students.sortBy('lastName');
  }),

  isStudentCourseMap: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Trigger when unit level  report clicked
     */
    onOpenUnitLevelReport(unit) {
      const controller = this;
      const classController = controller.get('classController');
      classController.openUnitReport(unit);
    },
    /**
     * Trigger when lesson level  report clicked
     */
    onOpenLessonReport(params) {
      const controller = this;
      const classController = controller.get('classController');
      classController.openLessonReport(params);
    },

    /**
     * Trigger when collection level teacher report clicked
     */
    teacherCollectionReport(params) {
      const controller = this;
      const classController = controller.get('classController');
      classController.openTeacherCollectionReport(params);
    },

    /**
     * Update 'location' (bound query param)
     *
     * @function
     * @param {String} newLocation - String of the form 'unitId[+lessonId[+resourceId]]'
     * @returns {undefined}
     */
    updateLocation: function(newLocation) {
      this.set('location', newLocation ? newLocation : null);
    },
    /**
     * Trigger action to update content visibility list
     */
    updateContentVisibility: function(contentId, visible) {
      this.send('updateContentVisible', contentId, visible);
    },

    /**
     * Triggered when a close welcome panel button is selected.
     */
    toggleHeader: function() {
      this.set('showWelcome', false);
    },

    onSelectAll() {
      let controller = this;
      controller.set('isLoading', true);
      controller.getUnitLevelPerformance();
      controller.set('isStudentCourseMap', false);
      controller.set('isLoading', false);
      Ember.$('.list').removeClass('active');
      Ember.$('.teacher.list').addClass('active');
    },

    onSelectStudent(student, index) {
      let controller = this;
      controller.set('isStudentCourseMap', true);
      controller.set('isLoading', true);
      controller.set('units', Ember.A([]));
      controller.set('activeStudent', student);
      controller.getStudentCourseMap(student.id);
      if (controller.get('isPremiumClass')) {
        controller.getRescopedData();
      }
      Ember.$('.list').removeClass('active');
      Ember.$(`.student-${index}`).addClass('active');
    },

    /**
     * Action triggered when the user click an accordion item
     */
    onSelectItem() {
      let component = this;
      if (component.get('isPremiumClass')) {
        let skippedContents = component.get('skippedContents');
        let isContentAvailable = component.get('isContentAvailable');
        if (skippedContents && isContentAvailable) {
          component.toggleSkippedContents(skippedContents);
        }
      }
    },

    collectionReport(params) {
      let component = this;
      component.set('studentReportContextData', params);
      component.set('isShowStudentReport', true);
    },

    onClosePullUp() {
      let controller = this;
      controller.set('isShowStudentReport', false);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function  get class course map performance by student
   * @param {objects} class & course  - class and courseId..
   */
  getStudentCourseMap(studentId) {
    let controller = this;
    let classId = controller.get('currentClass.id');
    let course = controller.get('course');
    let courseId = controller.get('course.id');
    const collectionType = {
      collectionType: 'assessment'
    };

    const studentUnitPerformance = controller
      .get('courseMapService')
      .findClassPerformanceByStudentIdUnitLevel(
        classId,
        courseId,
        studentId,
        collectionType
      );

    return Ember.RSVP.hash({
      studentUnitPerformance: studentUnitPerformance
    }).then(function(hash) {
      let unitsPerformance = hash.studentUnitPerformance[0];
      let unitUsageData = unitsPerformance.usageData;
      let units = course.get('children');
      let unPerformedUnit = {
        completionDone: 0,
        completionTotal: 0,
        score: -1,
        timeSpent: -1
      };
      units.map(unit => {
        let id = unit.get('id');
        let data = unitUsageData.findBy('unitId', id);
        if (data) {
          unit.set('performance', data);
        } else {
          unit.set('performance', unPerformedUnit);
        }
      });
      controller.set('units', units );
      controller.set('isLoading', false);
    });
  },

  getRescopedData() {
    let component = this;
    let isPremiumClass = component.get('isPremiumClass');
    //Initially load rescope data
    if (isPremiumClass) {
      component.set('isPremiumClass', isPremiumClass);
      component.getSkippedContents().then(function(skippedContents) {
        let isContentAvailable;
        if (skippedContents) {
          isContentAvailable = component.isSkippedContentsEmpty(
            skippedContents
          );
          component.set('isContentAvailable', isContentAvailable);
        }

        if (skippedContents && isContentAvailable) {
          component.toggleSkippedContents(skippedContents);
          component.set('isChecked', false);
        } else {
          component.set('isChecked', true);
        }
      });
    }
  },

  /**
   * @function getSkippedContents
   * Method to get skipped contents
   */
  getSkippedContents() {
    let controller = this;
    let currentClass = controller.get('currentClass');
    let filter = {
      classId: currentClass.get('id'),
      courseId: currentClass.get('courseId')
    };
    let skippedContentsPromise = Ember.RSVP.resolve(
      controller.get('rescopeService').getSkippedContents(filter)
    );
    return Ember.RSVP.hash({
      skippedContents: skippedContentsPromise
    })
      .then(function(hash) {
        controller.set('skippedContents', hash.skippedContents);
        return hash.skippedContents;
      })
      .catch(function() {
        controller.set('skippedContents', null);
      });
  },

  /**
   * @function getFormattedContentsByType
   * Method to get formatted content type
   */
  getFormattedContentsByType(contents, types) {
    let component = this;
    let formattedContents = Ember.A([]);
    types.map(type => {
      let flag = type.charAt(0);
      formattedContents = formattedContents.concat(
        component.parseSkippedContents(contents[`${type}`], flag)
      );
    });
    return formattedContents;
  },

  /**
   * @function parseSkippedContents
   * Method to parse fetched rescoped contents
   */
  parseSkippedContents(contentIds, flag) {
    let parsedContentIds = Ember.A([]);
    contentIds.map(id => {
      parsedContentIds.push(`.${flag}-${id}`);
    });
    return parsedContentIds;
  },

  /**
   * @function toggleSkippedContents
   * Method to toggle skippedContents
   */
  toggleSkippedContents(skippedContents) {
    let component = this;
    let contentTypes = Object.keys(skippedContents);
    let formattedContents = component.getFormattedContentsByType(
      skippedContents,
      contentTypes
    );
    component.toggleContentVisibility(formattedContents);
  },

  /**
   * @function toggleContentVisibility
   * Method to toggle content visibility
   */
  toggleContentVisibility(contentClassnames) {
    let component = this;
    let isChecked = component.get('isChecked');
    const $contentComponent = Ember.$(contentClassnames.join());
    if (isChecked) {
      $contentComponent.show().addClass('rescoped-content');
    } else {
      $contentComponent.hide();
    }
  },

  /**
   * @function isSkippedContentsEmpty
   * Method to toggle rescoped content visibility
   */
  isSkippedContentsEmpty(skippedContents) {
    let keys = Object.keys(skippedContents);
    let isContentAvailable = false;
    keys.some(key => {
      isContentAvailable = skippedContents[`${key}`].length > 0;
      return isContentAvailable;
    });
    return isContentAvailable;
  },


  /**
   **   Method to get unit level performance
   **/
  getUnitLevelPerformance() {
    let controller = this;
    let currentClass = controller.get('currentClass');
    let currentCourse = controller.get('course');
    let classId = currentClass.id;
    let courseId = currentCourse.id;
    let units = currentCourse.get('children') || [];
    let classMembers = controller.get('classMembers');
    let unitPerformancePromise = new Ember.RSVP.resolve(
      this.get('performanceService').findClassPerformance(
        classId,
        courseId,
        classMembers
      )
    );
    return Ember.RSVP.hash({
      unitPerformances: unitPerformancePromise
    }).then(function(hash) {
      let classPerformance = hash.unitPerformances;
      units.map(unit => {
        let unitId = unit.id;
        let score = classPerformance.calculateAverageScoreByItem(unitId);
        let timeSpent = classPerformance.calculateAverageTimeSpentByItem(
          unitId
        );
        let completionDone = classPerformance.calculateSumCompletionDoneByItem(
          unitId
        );
        let completionTotal = classPerformance.calculateSumCompletionTotalByItem(
          unitId
        );

        let numberOfStudnts = classPerformance.findNumberOfStudentsByItem(unitId);
        let performance = {
          score,
          timeSpent,
          completionDone,
          completionTotal,
          numberOfStudnts
        };
        unit.set('performance', performance);
      });
      controller.set('units', units);
    });
  }
});
