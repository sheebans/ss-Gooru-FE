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
        route.startLessonStudyPlayer(classId, courseId, unitId, lessonId);
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
    const userLocation = route
      .get('analyticsService')
      .getUserCurrentLocation(currentClass.get('id'), userId);
    var route0Promise = {};
    /* let setting = currentClass.get('setting');
    let premiumCourse = setting
      ? setting['course.premium'] && setting['course.premium'] === true
      : false;
    if (premiumCourse) {
      route0Promise = route
        .get('route0Service')
        .fetchInClass({ courseId: course.id, classId: currentClass.id });
    } else {
      route0Promise = new Ember.RSVP.Promise(function(resolve) {
        resolve({ status: '401' }); // This is a dummy status
      });
    } */

    route0Promise = new Ember.RSVP.Promise(function(resolve) {
      resolve(route.get('routeMockData')); // mockdata //ToDo: Remove mockdata
    });

    return Ember.RSVP.hash({
      userLocation: userLocation,
      course: course,
      units: units,
      currentClass: currentClass,
      classMembers: classMembers,
      route0: route0Promise
    });
  },

  routeMockData: {
    status: 'pending',
    route0Content: {
      units: [
        {
          unitId: 'a265b532-7a51-4e6f-80ef-b496f325be81',
          lessons: [],
          unitTitle: 'Domain1',
          unitSequence: 1
        },
        {
          unitId: 'fc46a468-6438-4248-9833-6200d3a11d37',
          lessons: [],
          unitTitle: 'Domain2',
          unitSequence: 2
        },
        {
          unitId: '579aedc5-4c31-4b17-a7d8-82be862c7705',
          lessons: [
            {
              lessonId: 'e5ecdda8-a02d-4249-981f-e1ee60b950f8',
              collections: [
                {
                  collectionId: 'b8bbe2d4-b099-434b-938b-3878d214c42c',
                  collectionType: 'assessment',
                  collectionSequence: 1
                },
                {
                  collectionId: '1a538189-cb33-4b2c-90b7-949a487bc885',
                  collectionType: 'collection',
                  collectionSequence: 2
                }
              ],
              lessonTitle: 'D4C1-student-desc',
              lessonSequence: 0
            },
            {
              lessonId: '36cd6142-1ffa-47f8-af13-7cb27de49a02',
              collections: [],
              lessonTitle: 'D4C2-student-desc',
              lessonSequence: 1
            }
          ],
          unitTitle: 'Domain4',
          unitSequence: 3
        },
        {
          unitId: '0d2d0aa5-3d89-4215-9a94-8fc2d032e099',
          lessons: [
            {
              lessonId: 'ecbd0972-f468-47f1-a749-f919fc328ae6',
              collections: [],
              lessonTitle: 'D5C1-student-desc',
              lessonSequence: 0
            },
            {
              lessonId: '16b7b629-f6ad-42d4-adf1-66b26a886888',
              collections: [],
              lessonTitle: 'D5C2-student-desc',
              lessonSequence: 1
            },
            {
              lessonId: '48ce33f9-da14-424c-acd4-42f7da2e3db8',
              collections: [],
              lessonTitle: 'D5C3-student-desc',
              lessonSequence: 2
            },
            {
              lessonId: '0d0c03e1-8ac7-46f1-bffb-9d15819db02c',
              collections: [],
              lessonTitle: 'D5C4-student-desc',
              lessonSequence: 3
            },
            {
              lessonId: '25896aac-2491-47a9-99a7-01d7d524532e',
              collections: [],
              lessonTitle: 'D5C5-student-desc',
              lessonSequence: 4
            },
            {
              lessonId: 'a0ae0ed0-8fc2-4e1e-b075-7bd78f73b3e0',
              collections: [],
              lessonTitle: 'D5C6-student-desc',
              lessonSequence: 5
            },
            {
              lessonId: '831e815a-d5a8-4874-bceb-76ca81762636',
              collections: [],
              lessonTitle: 'D5C7-student-desc',
              lessonSequence: 6
            }
          ],
          unitTitle: 'Domain5',
          unitSequence: 4
        }
      ]
    },
    userCompetencyRoute: {
      domains: [
        {
          path: [],
          sequence: 1,
          domainCode: 'D1',
          domainName: 'Domain1'
        },
        {
          path: [],
          sequence: 2,
          domainCode: 'D2',
          domainName: 'Domain2'
        },
        {
          path: [
            {
              sequence: 1,
              competencyCode: 'D4C1',
              competencyName: 'D4C1-name',
              competencyDescription: 'D4C1-desc',
              competencyStudentDescription: 'D4C1-student-desc'
            },
            {
              sequence: 2,
              competencyCode: 'D4C2',
              competencyName: 'D4C2-name',
              competencyDescription: 'D4C2-desc',
              competencyStudentDescription: 'D4C2-student-desc'
            }
          ],
          sequence: 4,
          domainCode: 'D4',
          domainName: 'Domain4'
        },
        {
          path: [
            {
              sequence: 1,
              competencyCode: 'D5C1',
              competencyName: 'D5C1-name',
              competencyDescription: 'D5C1-desc',
              competencyStudentDescription: 'D5C1-student-desc'
            },
            {
              sequence: 2,
              competencyCode: 'D5C2',
              competencyName: 'D5C2-name',
              competencyDescription: 'D5C2-desc',
              competencyStudentDescription: 'D5C2-student-desc'
            },
            {
              sequence: 3,
              competencyCode: 'D5C3',
              competencyName: 'D5C3-name',
              competencyDescription: 'D5C3-desc',
              competencyStudentDescription: 'D5C3-student-desc'
            },
            {
              sequence: 4,
              competencyCode: 'D5C4',
              competencyName: 'D5C4-name',
              competencyDescription: 'D5C4-desc',
              competencyStudentDescription: 'D5C4-student-desc'
            },
            {
              sequence: 5,
              competencyCode: 'D5C5',
              competencyName: 'D5C5-name',
              competencyDescription: 'D5C5-desc',
              competencyStudentDescription: 'D5C5-student-desc'
            },
            {
              sequence: 6,
              competencyCode: 'D5C6',
              competencyName: 'D5C6-name',
              competencyDescription: 'D5C6-desc',
              competencyStudentDescription: 'D5C6-student-desc'
            },
            {
              sequence: 7,
              competencyCode: 'D5C7',
              competencyName: 'D5C7-name',
              competencyDescription: 'D5C7-desc',
              competencyStudentDescription: 'D5C7-student-desc'
            }
          ],
          sequence: 5,
          domainCode: 'D5',
          domainName: 'Domain5'
        }
      ],
      subjectCode: 'MA'
    }
  },
  modela: function(params) {
    const route = this;
    var classModelRsvp = this.classModel(params);
    return classModelRsvp.then(function(hash) {
      const currentClass = hash.class;
      const course = hash.course;
      const units = hash.units;
      const userId = route.get('session.userId');
      const classMembers = currentClass.get('members');
      const userLocation = route
        .get('analyticsService')
        .getUserCurrentLocation(currentClass.get('id'), userId);

      return Ember.RSVP.hash({
        userLocation: userLocation,
        course: course,
        units: units,
        currentClass: currentClass,
        classMembers: classMembers
      });
    });
  },

  classModel: function() {
    const route = this;
    const myId = route.get('session.userId');

    //Steps for Take a Tour functionality
    let tourSteps = Ember.A([
      {
        title: route.get('i18n').t('gru-take-tour.student-class.stepOne.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepOne.description')
      },
      {
        elementSelector: '.student .classroom-information',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepTopBar.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepTopBar.description')
      },
      {
        elementSelector: '.gru-class-navigation .nav-tabs .class-activities',
        title: route.get('i18n').t('gru-take-tour.student-class.stepTwo.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepTwo.description')
      },
      {
        elementSelector: '.gru-class-navigation .nav-tabs .course-map',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepThree.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepThree.description')
      },
      {
        elementSelector: '.gru-class-navigation .nav-tabs .performance',
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFour.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFour.description')
      },
      {
        title: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFive.title'),
        description: route
          .get('i18n')
          .t('gru-take-tour.student-class.stepFive.description')
      }
    ]);

    const classId = '13ff77c7-3cd2-43c5-8b2c-660746c8cdca';
    const classPromise = route.get('classService').readClassInfo(classId);
    const membersPromise = route.get('classService').readClassMembers(classId);
    const performanceSummaryPromise = route
      .get('performanceService')
      .findClassPerformanceSummaryByStudentAndClassIds(myId, [classId]);
    return Ember.RSVP.hash({
      class: classPromise,
      members: membersPromise,
      classPerformanceSummaryItems: performanceSummaryPromise
    }).then(function(hash) {
      const aClass = hash.class;
      const members = hash.members;
      const classPerformanceSummaryItems = hash.classPerformanceSummaryItems;
      aClass.set(
        'performanceSummary',
        classPerformanceSummaryItems.findBy('classId', classId)
      );
      const courseId = aClass.get('courseId');
      let visibilityPromise = Ember.RSVP.resolve([]);
      let coursePromise = Ember.RSVP.resolve(Ember.Object.create({}));

      if (courseId) {
        visibilityPromise = route
          .get('classService')
          .readClassContentVisibility(classId);
        coursePromise = route.get('courseService').fetchById(courseId);
      }
      return Ember.RSVP.hash({
        contentVisibility: visibilityPromise,
        course: coursePromise
      }).then(function(hash) {
        const contentVisibility = hash.contentVisibility;
        const course = hash.course;
        aClass.set('owner', members.get('owner'));
        aClass.set('collaborators', members.get('collaborators'));
        aClass.set('members', members.get('members'));
        return Ember.RSVP.hash({
          class: aClass,
          course: course,
          members: members,
          units: course.get('children') || [],
          contentVisibility: contentVisibility,
          tourSteps: tourSteps
        });
      });
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
      isStudyPlayer: true
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
          classId
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
          classId
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
  startLessonStudyPlayer: function(classId, courseId, unitId, lessonId) {
    const route = this;
    const role = ROLES.STUDENT;
    const queryParams = {
      classId,
      unitId,
      lessonId,
      role,
      source: PLAYER_EVENT_SOURCE.COURSE_MAP
    };
    route
      .get('navigateMapService')
      .startLesson(courseId, unitId, lessonId, classId)
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
      pathId: resource.get('pathId')
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
        classId
      )
      .then(function() {
        if (classId) {
          queryParams.classId = classId;
        }
        route.transitionTo('resource-player', courseId, resource.id, {
          queryParams
        });
      });
  }
});
