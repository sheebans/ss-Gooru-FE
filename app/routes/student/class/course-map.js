import Ember from 'ember';
import { ROLES, PLAYER_EVENT_SOURCE } from 'gooru-web/config/config';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),
  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),
  /**
   * @type {CourseService} Service to retrieve course information
   */
  courseService: Ember.inject.service('api-sdk/course'),

  /**
   * @type {UnitService} Service to retrieve unit information
   */
  unitService: Ember.inject.service('api-sdk/unit'),
  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  i18n: Ember.inject.service(),

  profileService: Ember.inject.service('api-sdk/profile'),
  /**
   * @requires service:api-sdk/analytics
   */
  analyticsService: Ember.inject.service('api-sdk/analytics'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  route0Service: Ember.inject.service('api-sdk/route0'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    studyNow: function() {
      const route = this;
      const currentClass = route.modelFor('student.class').class;
      const classId = currentClass.get('id');
      const courseId = currentClass.get('courseId');

      route.continueCourseStudyPlayer(classId, courseId);
    },

    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} item - collection, assessment, lesson or resource
     */
    studyPlayer: function(type, unitId, lessonId, item) {
      const route = this;
      const currentClass = route.modelFor('student.class').class;
      const classId = currentClass.get('id');
      const courseId = currentClass.get('courseId');
      item.set('minScore', currentClass.get('minScore'));

      if (type === 'lesson') {
        route.startLessonStudyPlayer(
          classId,
          courseId,
          unitId,
          lessonId,
          item.pathType
        );
      } else if (type === 'resource') {
        route.startResourceStudyPlayer(classId, courseId, item);
      } else {
        route.startCollectionStudyPlayer(
          classId,
          courseId,
          unitId,
          lessonId,
          item
        );
      }
    },
    updateCourseMap: function() {
      this.refresh(true);
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  model: function() {
    const route = this;
    const currentClass = route.modelFor('student.class').class;
    const course = route.modelFor('student.class').course;
    const units = route.modelFor('student.class').units;
    const userId = route.get('session.userId');
    const classMembers = currentClass.get('members');
    const courseId = course.get('id');
    if (!courseId) {
      return false;
    }
    const classId = currentClass.get('id');
    route.fetchUnitsPerformance(userId, classId, courseId, units);
    //Pass courseId as query param for student current location
    let locationQueryParam = {
      courseId
    };
    const userLocation = route
      .get('analyticsService')
      .getUserCurrentLocation(
        currentClass.get('id'),
        userId,
        locationQueryParam
      );
    var route0Promise = {};
    let setting = currentClass.get('setting');
    let premiumCourse = setting
      ? setting['course.premium'] && setting['course.premium'] === true
      : false;
    if (premiumCourse) {
      route0Promise = route.get('route0Service').fetchInClass({
        courseId: course.id,
        classId: currentClass.id
      });
    } else {
      route0Promise = new Ember.RSVP.Promise(function(resolve) {
        resolve({
          status: '401'
        }); // This is a dummy status
      });
    }

    /*
     status: 'pending', //'accepted' , 'regected', 'na= not applicable, already complted' , 'na = not avalible, course does not have anything to offer'
    */
    return Ember.RSVP.hash({
      userLocation: userLocation,
      course: course,
      units: units,
      currentClass: currentClass,
      classMembers: classMembers,
      route0: route0Promise
    });
  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    let userLocation = '';
    if (model.userLocation) {
      let unitId = model.userLocation.get('unitId');
      let lessonId = model.userLocation.get('lessonId');
      let collectionId = model.userLocation.get('collectionId');
      userLocation = `${unitId}+${lessonId}+${collectionId}`;
    }

    controller.set('currentClass', model.currentClass);
    controller.set('userLocation', userLocation);
    controller.set('units', model.units);
    controller.set('course', model.course);
    controller.set('classMembers', model.classMembers);
    controller.set('route0', model.route0);
    controller.get('studentClassController').selectMenuItem('course-map');
    controller.init();
  },

  resetController(controller) {
    controller.set('tab', null);
  },

  /**
   * Navigates to collection
   * @param {string} classId
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   * @param {Collection} collection
   */
  startCollectionStudyPlayer: function(
    classId,
    courseId,
    unitId,
    lessonId,
    collection
  ) {
    let route = this;
    let role = ROLES.STUDENT;
    let source = PLAYER_EVENT_SOURCE.COURSE_MAP;
    let collectionId = collection.get('id');
    let collectionType = collection.get('collectionType');
    let collectionSubType = collection.get('collectionSubType');
    let minScore = collection.get('minScore');
    let pathId = collection.get('pathId') || 0;
    let pathType = collection.get('pathType') || '';
    let queryParams = {
      classId,
      unitId,
      lessonId,
      collectionId,
      role,
      source,
      type: collectionType,
      subtype: collectionSubType,
      pathId,
      minScore,
      collectionSource: collection.source || 'course_map',
      isStudyPlayer: true,
      pathType
    };

    let suggestionPromise = null;
    // Verifies if it is a suggested Collection/Assessment
    if (collectionSubType) {
      suggestionPromise = route
        .get('navigateMapService')
        .startSuggestion(
          courseId,
          unitId,
          lessonId,
          collectionId,
          collectionType,
          collectionSubType,
          pathId,
          classId,
          pathType
        );
    } else {
      suggestionPromise = route
        .get('navigateMapService')
        .startCollection(
          courseId,
          unitId,
          lessonId,
          collectionId,
          collectionType,
          classId,
          pathId,
          pathType
        );
    }
    suggestionPromise.then(() =>
      route.transitionTo('study-player', courseId, {
        queryParams
      })
    );
  },

  /**
   * Navigates to the next lesson collection
   * @param {string} classId
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
   */
  startLessonStudyPlayer: function(
    classId,
    courseId,
    unitId,
    lessonId,
    pathType
  ) {
    const route = this;
    const role = ROLES.STUDENT;
    const queryParams = {
      classId,
      unitId,
      lessonId,
      role,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      pathType
    };
    route
      .get('navigateMapService')
      .startLesson(courseId, unitId, lessonId, classId, pathType)
      .then(() =>
        route.transitionTo('study-player', courseId, {
          queryParams
        })
      );
  },

  /**
   * Resumes or start the course study player
   * @param {string} classId
   * @param {string} courseId
   */
  continueCourseStudyPlayer: function(classId, courseId) {
    const route = this;
    const queryParams = {
      role: ROLES.STUDENT,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      classId
    };
    route
      .get('navigateMapService')
      .continueCourse(courseId, classId)
      .then(() =>
        route.transitionTo('study-player', courseId, {
          queryParams
        })
      );
  },

  /**
   * Navigates to resourse
   * @param {string} classId
   * @param {string} courseId
   * @param {Resource} resource
   */
  startResourceStudyPlayer: function(classId, courseId, resource) {
    const route = this;
    let queryParams = {
      unitId: resource.get('unitId'),
      lessonId: resource.get('lessonId'),
      collectionId: resource.get('assessmentId'),
      source: PLAYER_EVENT_SOURCE.COURSE_MAP,
      pathId: resource.get('pathId'),
      pathType: resource.get('pathType') || ''
    };
    route
      .get('navigateMapService')
      .startResource(
        courseId,
        queryParams.unitId,
        queryParams.lessonId,
        queryParams.collectionId,
        resource.get('id'),
        queryParams.pathId,
        classId,
        queryParams.pathType
      )
      .then(function() {
        if (classId) {
          queryParams.classId = classId;
        }
        route.transitionTo('resource-player', courseId, resource.id, {
          queryParams
        });
      });
  },

  fetchUnitsPerformance(userId, classId, courseId, units) {
    let route = this;
    route
      .get('performanceService')
      .findStudentPerformanceByCourse(userId, classId, courseId, units)
      .then(unitsPerformance => {
        units.forEach(unit => {
          let unitPerformance = unitsPerformance.findBy('id', unit.get('id'));
          if (unitPerformance) {
            unit.set('performance', unitPerformance);
          }
        });
      });
  }
});
