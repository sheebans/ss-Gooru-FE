import Ember from 'ember';
import { ROLES } from 'gooru-web/config/config';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

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
     * @param {string} collection - collection or assessment
     */
    playResource: function (unitId, lessonId, collection) {
      if (collection.get('isExternalAssessment')){
        window.open(collection.get('url'));
      }
      else{
        const currentClass = this.modelFor('student.class').class;
        const classId = currentClass.get('id');
        const courseId = currentClass.get('courseId');
        const role = ROLES.STUDENT;
        this.transitionTo('context-player', classId, courseId, unitId,
          lessonId, collection.get('id'), { queryParams: { role: role, type: collection.get('collectionType') }});
      }
    },
    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} unitId - Identifier for a unit
     * @param {string} lessonId - Identifier for lesson
     * @param {string} collection - collection or assessment
     */
    studyPlayer: function (type, unitId, lessonId, collection) {
      const route = this;
      const currentClass = route.modelFor('student.class').class;
      const classId = currentClass.get('id');
      const courseId = currentClass.get('courseId');

      if (type === 'lesson') {
        route.startLessonStudyPlayer(classId, courseId, unitId, lessonId);
      }
      else {
        route.startCollectionStudyPlayer(classId, courseId, unitId, lessonId, collection);
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
    const userLocation = route.get('analyticsService').getUserCurrentLocation(currentClass.get('id'), userId);

    return Ember.RSVP.hash({
      userLocation: userLocation,
      course: course,
      units: units,
      currentClass: currentClass,
      classMembers: classMembers
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function (controller, model) {
    let userLocation = '';
    if(model.userLocation) {
      let unitId = model.userLocation.get('unitId');
      let lessonId = model.userLocation.get('lessonId');
      let collectionId = model.userLocation.get('collectionId');
      userLocation = `${unitId}+${lessonId}+${collectionId}`;
    }

    controller.set('userLocation', userLocation);
    controller.set('units', model.units);
    controller.set('course', model.course);
    controller.set('classMembers', model.classMembers);
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
  startCollectionStudyPlayer:function(classId, courseId, unitId, lessonId, collection) {
    const route = this;
    const role = ROLES.STUDENT;
    const collectionId = collection.get('id');
    const collectionType = collection.get('collectionType');

    const queryParams = {
      unitId: unitId,
      lessonId: lessonId,
      collectionId: collectionId,
      type: collectionType,
      role: role
    };
    route.transitionTo('study-player', classId, courseId, { queryParams: queryParams });
  },

  /**
   * Navigates to the next lesson collection
   * @param {string} classId
   * @param {string} courseId
   * @param {string} unitId
   * @param {string} lessonId
     */
  startLessonStudyPlayer:function(classId, courseId, unitId, lessonId) {
    const route = this;
    const role = ROLES.STUDENT;
    const queryParams = {
      unitId: unitId,
      lessonId: lessonId,
      role: role
    };
    route.transitionTo('study-player', classId, courseId, { queryParams: queryParams });
  },

  /**
   * Resumes or start the course study player
   * @param {string} classId
   * @param {string} courseId
     */
  continueCourseStudyPlayer: function (classId, courseId) {
    const route = this;
    const queryParams = {
      role: ROLES.STUDENT
    };
    route.transitionTo('study-player', classId, courseId, { queryParams: queryParams });
  }
});
