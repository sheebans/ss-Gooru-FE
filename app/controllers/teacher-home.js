import Ember from 'ember';
import Env from 'gooru-web/config/environment';
import ModalMixin from 'gooru-web/mixins/modal';
import { getBarGradeColor } from 'gooru-web/utils/utils';

export default Ember.Controller.extend(ModalMixin, {
  queryParams: ['showArchivedClasses', 'showActiveClasses'],

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/class
   */

  classService: Ember.inject.service('api-sdk/class'),
  /**
   * @requires service:api-sdk/application
   */

  applicationController: Ember.inject.controller('application'),

  /**
   * @requires controller:teacher/class
   */
  teacherClassController: Ember.inject.controller('teacher/class'),

  /**
   * @requires service:api-sdk/performance
   */

  performanceService: Ember.inject.service('api-sdk/performance'),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @property {Service} Session service
   */
  session: Ember.inject.service('session'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function getLastAccessedClassData
   * Method to get last accessed class data from localStorage/first class
   */
  getLastAccessedClassData() {
    const controller = this;
    let userId = controller.get('session.userId');
    let lastAccessedClassData =
      JSON.parse(localStorage.getItem(`${userId}_recent_class`)) || null;
    let isLastAccessedClassAvailable = lastAccessedClassData
      ? Object.keys(lastAccessedClassData).length
      : null;
    //If last accessed class available in the local storage
    if (!isLastAccessedClassAvailable) {
      let activeClasses = controller.get('activeClasses');
      lastAccessedClassData = activeClasses ? activeClasses.objectAt(0) : null;
      let courseId = lastAccessedClassData
        ? lastAccessedClassData.courseId
        : null;
      if (courseId) {
        Ember.RSVP.hash({
          courseData: controller
            .get('courseService')
            .fetchByIdWithOutProfile(courseId)
        }).then(({ courseData }) => {
          lastAccessedClassData.course = courseData;
          if (lastAccessedClassData) {
            lastAccessedClassData = controller.updateLastAccessedClass(
              lastAccessedClassData
            );
          }
        });
      }
    }
    controller.set('lastAccessedClassData', lastAccessedClassData);
    return lastAccessedClassData;
  },

  loadPerformance() {
    let controller = this;
    if (controller.get('showArchivedClasses')) {
      let archivedClasses = controller.get('archivedClasses');
      controller.loadClassPerformance(archivedClasses);
      controller.set('isArchivedClassPerformanceLoaded', true);
    } else {
      let activeClasses = controller.get('activeClasses');
      controller.loadClassPerformance(activeClasses);
      controller.set('isActiveClassPerformanceLoaded', true);
    }
  },

  loadClassPerformance(classes) {
    let route = this;
    let classCourseIds = route.getListOfClassCourseIds(classes);
    route
      .get('performanceService')
      .findClassPerformanceSummaryByClassIds(classCourseIds)
      .then(function(classPerformanceSummaryItems) {
        classes.forEach(function(clas) {
          let classId = clas.get('id');
          let courseId = clas.get('courseId');
          if (courseId) {
            route
              .get('courseService')
              .fetchByIdWithOutProfile(courseId)
              .then(course => {
                clas.set('course', course);
                clas.set('unitsCount', course.get('unitCount'));
              });
          }
          clas.set(
            'performanceSummary',
            classPerformanceSummaryItems.findBy('classId', classId)
          );
        });
      });
  },

  /**
   * @function getSequencedActiveClass
   * Method to get next/previous class by given sequence number
   */
  getSequencedActiveClass(classSeq) {
    const controller = this;
    let activeClasses = controller.get('activeClasses');
    let sequencedActiveClass = activeClasses.objectAt(classSeq) || null;
    if (sequencedActiveClass) {
      sequencedActiveClass = controller.updateLastAccessedClass(
        sequencedActiveClass
      );
    }
    return sequencedActiveClass;
  },

  /**
   * @function updateLastAccessedClass
   * Method to update last accessed class data into the localStorage
   */
  updateLastAccessedClass(classData) {
    const controller = this;
    controller.updateLastAccessedClassPosition(classData.id);
    return controller
      .get('teacherClassController')
      .updateLastAccessedClass(classData);
  },

  /**
   * @function updateLastAccessedClassPosition
   * Method to update last accessed class position
   */
  updateLastAccessedClassPosition(classId) {
    let controller = this;
    let activeClasses = controller.get('activeClasses');
    let classPosition = activeClasses.findIndex(function(classData) {
      return classData.id === classId;
    });
    controller.set('currentClassPosition', classPosition);
    return classPosition;
  },

  /**
   * @function checkIsPartOfPremiumClass
   * Method to check is the teacher part of any premium class
   */
  checkIsPartOfPremiumClass(activeClasses) {
    let isPartOfPremiumClass = false;
    activeClasses.some(function(classData) {
      let setting = classData.get('setting');
      isPartOfPremiumClass = setting ? setting['course.premium'] : false;
      return isPartOfPremiumClass;
    });
    return isPartOfPremiumClass;
  },

  /**
   * @function getListOfClassCourseIds
   * Method to fetch class and course ids from the list of classess
   */
  getListOfClassCourseIds(classes) {
    let listOfActiveClassCourseIds = Ember.A([]);
    classes.map(clas => {
      if (clas.get('courseId')) {
        let classCourseId = {
          classId: clas.get('id'),
          courseId: clas.get('courseId')
        };
        listOfActiveClassCourseIds.push(classCourseId);
      }
    });
    return listOfActiveClassCourseIds;
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     *Filter by most recent
     */
    filterByDate: function() {
      if (this.get('sortOn') === 'title') {
        this.set('order', 'desc');
        this.set('sortOn', 'startDate');
      } else {
        this.set('order', this.get('order') === 'asc' ? 'desc' : 'asc');
      }
    },
    /**
     *Filter by alphanumeric

     */
    filterByTitle: function() {
      if (this.get('sortOn') === 'startDate') {
        this.set('order', 'asc');
        this.set('sortOn', 'title');
      } else {
        this.set('order', this.get('order') === 'desc' ? 'asc' : 'desc');
      }
    },
    showClasses: function(type) {
      this.set('showActiveClasses', type === 'active');
      this.set('showArchivedClasses', type === 'archived');
      if (!this.get('isActiveClassPerformanceLoaded')) {
        this.loadPerformance();
      }
    },

    archivedClass: function(type) {
      this.set('showArchivedClasses', type === 'archived');
      this.set('showActiveClasses', type === 'active');
      if (!this.get('isArchivedClassPerformanceLoaded')) {
        this.loadPerformance();
      }
    },

    updateClass: function(classId) {
      const controller = this;
      controller.send('updateUserClasses'); // Triggers the refresh of user classes in top header
      controller.transitionToRoute('teacher.class.course-map', classId);
    },

    /**
     * Action triggered when user move to next/previous class
     */
    onChangeAtcClass(actionSequence) {
      const controller = this;
      let currentClassPosition = controller.get('currentClassPosition');
      let classSeq =
        actionSequence === 'previous'
          ? currentClassPosition - 1
          : currentClassPosition + 1;
      controller.set(
        'lastAccessedClassData',
        controller.getSequencedActiveClass(classSeq)
      );
    },

    /**
     * Action triggered when user change atc/class-room view
     */
    onToggleTeacherView(view) {
      let controller = this;
      let isShowAtcView = true;
      if (view === 'classroom') {
        isShowAtcView = false;
      }
      controller.set('isShowAtcView', isShowAtcView);
    },

    /**
     * Action triggered when select a domain from pull up
     */
    onSelectDomain(domainSet) {
      let controller = this;
      controller.set('selectedDomain', domainSet);
      controller.set('isShowDomainCompetencyReport', true);
    },

    /**
     * Action triggered when close all competency report pull ups
     */
    onCloseCompetencyReportPullUp() {
      let controller = this;
      controller.set('isShowDomainCompetencyReport', false);
      controller.set('isShowCompetencyReport', false);
    },

    /**
     * Action triggered when select a competency from competency report
     */
    onSelectCompetency(competency, userId) {
      let controller = this;
      controller.set('selectedCompetency', competency);
      controller.set('selectedStudentUserId', userId);
      controller.set('isShowCompetencyContentReport', true);
    }
  },

  // -------------------------------------------------------------------------
  // Events
  init: function() {
    const controller = this;
    controller._super(...arguments);
    controller.getLastAccessedClassData();
    let localStorage = this.get('applicationController').getLocalStorage();
    const userId = this.get('session.userId');
    const localStorageLogins = `${userId}_logins`;
    let loginCount = localStorage.getItem(localStorageLogins);
    if (loginCount) {
      this.set('loginCount', +loginCount);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates when then active classes are visible
   * @property {boolean}
   */
  showActiveClasses: true,

  /**
   * Indicates when then archived classes are visible
   * @property {boolean}
   */
  showArchivedClasses: false,

  /**
   * Maintains the state of Active class performance loaded ot not
   * @type {Boolean}
   */
  isActiveClassPerformanceLoaded: false,

  /**
   * Maintains the state of Archived class performance loaded ot not
   * @type {Boolean}
   */
  isArchivedClassPerformanceLoaded: false,

  /**
   * A link to the parent application controller
   * @see controllers/application.js
   * @property {ClassesModel}
   */
  myClasses: Ember.computed.alias('applicationController.myClasses'),

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile'),

  /**
   * @property {Number} Total of teaching classes
   */
  totalTeachingClasses: Ember.computed.alias('activeClasses.length'),

  /**
   * @property {boolean} Indicates if there are classes
   */
  hasClasses: Ember.computed.bool('totalTeachingClasses'),

  /**
   * @property {string} Indicates the order of the sorting
   */
  order: 'desc',

  /**
   * @property {string} Indicates the sorting criteria
   */
  sortOn: 'startDate',
  /**
   * @property {[Class]} Sorted archived classrooms
   */
  sortedArchivedClassrooms: Ember.computed.sort(
    'archivedClasses',
    'sortDefinition'
  ),
  /**
   * sort Definition
   */
  sortDefinition: Ember.computed('sortOn', 'order', function() {
    return [`${this.get('sortOn')}:${this.get('order')}`];
  }),

  /**
   * Toolkit site url
   * @property {string}
   */
  toolkitSiteUrl: Ember.computed(function() {
    return Env.toolkitSiteUrl;
  }),

  /**
   * @property {Array[]} - featuredCourses
   */
  featuredCourses: null,

  /**
   * @property {Number} - Amount of logins by the user
   */
  loginCount: null,

  /**
   * @property {JSON}
   * Property to store last accessed class data
   */
  lastAccessedClassData: null,

  /**
   * @property {Boolean}
   * Property to show/hide ATC view
   */
  isShowAtcView: false,

  /**
   * @property {Number}
   * Property to store last accessed class position
   */
  currentClassPosition: 0,

  /**
   * @property {String}
   * Property to hold class performance color based on score value
   */
  classPerformanceColor: Ember.computed('lastAccessedClassData', function() {
    let controller = this;
    let classPerformance = controller.get('lastAccessedClassData.performance');
    return classPerformance ? getBarGradeColor(classPerformance.score) : null;
  }),

  isShowNavigatorBanner: Ember.computed('activeClasses', function() {
    let controller = this;
    let activeClasses = controller.get('activeClasses');
    return !controller.checkIsPartOfPremiumClass(activeClasses);
  })
});
