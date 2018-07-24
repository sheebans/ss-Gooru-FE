import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import { CONTENT_TYPES } from 'gooru-web/config/config';

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
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @property {NavigateMapService}
   */
  navigateMapService: Ember.inject.service('api-sdk/navigate-map'),

  /**
   * @type {AttemptService} attemptService
   * @property {Ember.Service} Service to send attempt related events
   */
  quizzesAttemptService: Ember.inject.service('quizzes/attempt'),

  /**
   * @type {suggestService} Service to retrieve suggest resources
   */
  suggestService: Ember.inject.service('api-sdk/suggest'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * When the submission is complete
     */
    onFinish: function() {
      let controller = this.get('controller');
      let profileId = this.get('session.userData.gooruUId');
      let contextId = controller.get('contextResult.contextId');
      let classId = controller.get('classId');
      let queryParams = {
        courseId: controller.get('course.id'),
        collectionId: controller.get('collection.id'),
        type: controller.get('type'),
        role: controller.get('role'),
        lessonId: controller.get('lessonId'),
        unitId: controller.get('unitId'),
        contextId,
        source: controller.get('source'),
        minScore: controller.get('minScore'),
        pathType: controller.get('pathType') || ''
      };
      if (classId) {
        queryParams.classId = classId;
      }
      const navigateMapService = this.get('navigateMapService');
      this.get('quizzesAttemptService')
        .getAttemptIds(contextId, profileId)
        .then(
          attemptIds =>
            !attemptIds || !attemptIds.length
              ? {}
              : this.get('quizzesAttemptService').getAttemptData(
                attemptIds[attemptIds.length - 1]
              )
        )
        .then(attemptData =>
          Ember.RSVP.hash({
            attemptData,
            mapLocation: navigateMapService.getStoredNext()
          })
        )
        .then(({ mapLocation, attemptData }) => {
          mapLocation.context.set('score', attemptData.get('averageScore'));
          return navigateMapService.next(mapLocation.context);
        })
        .then(() =>
          this.transitionTo('reports.study-student-collection', {
            queryParams
          })
        );
    },

    /**
     * When a pre-test needs to be loaded
     */
    loadPreTest: function() {
      const navigateMapService = this.get('navigateMapService');
      navigateMapService
        .getStoredNext()
        .then(mapLocation => navigateMapService.next(mapLocation.context))
        .then(() => this.refresh());
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  model: function(params) {
    const route = this;
    return route
      .get('navigateMapService')
      .getMapLocation(params)
      .then(function(mapLocation) {
        const courseId = mapLocation.get('context.courseId');
        const unitId = mapLocation.get('context.unitId');
        const lessonId = mapLocation.get('context.lessonId');
        const collectionId =
          mapLocation.get('context.itemId') ||
          mapLocation.get('context.collectionId');
        params.type =
          mapLocation.get('context.itemType') ||
          mapLocation.get('context.collectionType');
        if (params.type === CONTENT_TYPES.EXTERNAL_ASSESSMENT) {
          route.transitionTo('study-player-external');
        }

        return Ember.RSVP.hash({
          course: route.get('courseService').fetchById(courseId),
          unit: route.get('unitService').fetchById(courseId, unitId),
          lesson: route
            .get('lessonService')
            .fetchById(courseId, unitId, lessonId),
          suggestedResources:
            collectionId != null
              ? route
                .get('suggestService')
                .suggestResourcesForCollection(
                  route.get('session.userId'),
                  collectionId
                )
              : null
        }).then(function(hash) {
          //setting query params using the map location
          params.collectionId = collectionId;
          params.classId = params.classId || mapLocation.get('context.classId');
          params.unitId = params.unitId || mapLocation.get('context.unitId');
          params.lessonId =
            params.lessonId || mapLocation.get('context.lessonId');
          params.pathId = params.pathId || mapLocation.get('context.pathId');
          params.collectionSubType =
            params.subtype || mapLocation.get('context.collectionSubType');

          // Set the correct unit sequence number
          hash.course.children.find((child, index) => {
            let found = false;
            if (child.get('id') === hash.unit.get('id')) {
              found = true;
              hash.unit.set('sequence', index + 1);
            }
            return found;
          });

          // Set the correct lesson sequence number
          hash.unit.children.find((child, index) => {
            let found = false;
            if (child.get('id') === hash.lesson.get('id')) {
              found = true;
              hash.lesson.set('sequence', index + 1);
            }
            return found;
          });

          //loads the player model if it has no suggestions
          return route.playerModel(params).then(function(model) {
            return Object.assign(model, {
              course: hash.course,
              unit: hash.unit,
              lesson: hash.lesson,
              mapLocation,
              collectionId: params.collectionId,
              type: params.type,
              minScore: params.minScore,
              suggestedResources: hash.suggestedResources
            });
          });
        });
      });
  },

  setupController(controller, model) {
    this._super(...arguments);
    const isAnonymous = model.isAnonymous;
    const mapLocation = model.mapLocation;
    controller.setProperties({
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      showConfirmation:
        model.collection &&
        !(model.collection.get('isCollection') || isAnonymous), //TODO: move to computed
      mapLocation: model.mapLocation,
      classId: mapLocation.get('context.classId'),
      //setting query params variables using the map location
      unitId: mapLocation.get('context.unitId'),
      lessonId: mapLocation.get('context.lessonId'),
      collectionId: model.collectionId,
      courseId: mapLocation.get('context.courseId'),
      type: model.type,
      minScore: model.minScore,
      suggestedResources: model.suggestedResources
    });
  },

  selectMenuItem: function(item) {
    const route = this;
    const controller = route.get('controller');
    const currentItem = controller.get('menuItem');

    if (item !== currentItem) {
      controller.selectMenuItem(item);
      if (item === 'class-management') {
        route.transitionTo('teacher.class.class-management');
      } else if (item === 'course-map') {
        route.transitionTo('teacher.class.course-map');
      } else if (item === 'performance') {
        route.transitionTo('teacher.class.performance');
      } else if (item === 'class-activities') {
        route.transitionTo('teacher.class.class-activities');
      } else if (item === 'close') {
        let backurl = this.get('backUrls');
        backurl = backurl || controller.get('backUrls');
        if (backurl) {
          route.transitionTo(backurl);
        } else {
          if (controller.class.isArchived) {
            route.transitionTo('teacher-home'); //, (query - params showArchivedClasses = "true" showActiveClasses = "false") class="back-to" } }
          } else {
            route.transitionTo('teacher-home');
          }
        }
      }
    }
  },

  deactivate: function() {
    this.get('controller').resetValues();
  }
});
