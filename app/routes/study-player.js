import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import { ROLES } from 'gooru-web/config/config';


/**
 * Study Player Route
 *
 * The context player route extends the player route to provide the study player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend(PrivateRouteMixin, {
  templateName: 'study-player',

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * When the submission is complete
     */
    onFinish: function () {
      let controller = this.get('controller');
      let queryParams = {
        collectionId: controller.get('collection.id'),
        type: controller.get('type'),
        role: controller.get('role'),
        classId: controller.get('classId'),
        contextId: controller.get('contextResult.contextId')
      };
      this.transitionTo(
        'reports.study-student-collection',
        { queryParams }
      );
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  model: function(params) {
    const route = this;
    return route.getMapLocation(params).then(function (mapLocation) {
      const courseId = mapLocation.get('context.courseId');
      const unitId = mapLocation.get('context.unitId');
      const lessonId = mapLocation.get('context.lessonId');

      //calling the player model
      return Ember.RSVP.hash({ //loading breadcrumb information and navigation info
        course: route.get('courseService').fetchById(courseId),
        unit: route.get('unitService').fetchById(courseId, unitId),
        lesson: route.get('lessonService').fetchById(courseId, unitId, lessonId)
      }).then(function (hash) {
        const hasPreTestSuggestion = mapLocation.get('hasPreTestSuggestion');
        //loads the player model if it has no suggestions

        //setting query params using the map location
        params.collectionId = mapLocation.get('context.collectionId');
        params.type = mapLocation.get('context.collectionType');

        const playerModel = !hasPreTestSuggestion ? route.playerModel(params) : Ember.RSVP.resolve({});
        return playerModel.then(function (model) {
          return Object.assign(model, {
            course: hash.course,
            unit: hash.unit,
            lesson: hash.lesson,
            mapLocation: mapLocation
          });
        });
      });
    });
  },

  setupController(controller, model) {
    const isAnonymous = model.isAnonymous; //TODO is this coming from quizzes?
    const isTeacher = model.role === ROLES.TEACHER; //TODO a teacher can use the study player?
    const mapLocation = model.mapLocation;
    controller.setProperties({
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      showConfirmation: !(model.collection.get('isCollection') || isAnonymous || isTeacher),
      mapLocation: model.mapLocation,
      classId: mapLocation.get('context.classId'),
      //setting query params variables using the map location
      unitId: mapLocation.get('context.unitId'),
      lessonId: mapLocation.get('context.lessonId'),
      collectionId: mapLocation.get('context.collectionId'),
      type: mapLocation.get('context.collectionType')
    });

    this._super(...arguments);
  },

  /**
   * Gets the map location for the study player based on parameters
   * @param params
   * @returns {*}
     */
  getMapLocation: function(params) {
    const route = this;
    const classId = params.classId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const collectionType = params.type;
    const collectionId = params.collectionId;

    const continueCourse = !unitId;
    const startLesson = lessonId && !collectionId;

    const navigateMapService = route.get('navigateMapService');

    let mapLocationPromise = null;
    if (continueCourse) {
      mapLocationPromise = navigateMapService.continueCourse(courseId, classId);
    }
    else if (startLesson) {
      mapLocationPromise = navigateMapService.startLesson(courseId, unitId, lessonId, classId);
    }
    else {
      mapLocationPromise = navigateMapService.startCollection(courseId, unitId, lessonId, collectionId, collectionType, classId);
    }
    return mapLocationPromise;
  },

  deactivate: function() {
    this.get('controller').resetValues();
  }
});
