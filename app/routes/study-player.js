import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';


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

  /**
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * When the submission is complete
     */
    onFinish: function () {
      let controller = this.get('controller');
      let queryParams = {
        courseId: controller.get('course.id'),
        collectionId: controller.get('collection.id'),
        type: controller.get('type'),
        role: controller.get('role'),
        classId: controller.get('classId'),
        contextId: controller.get('contextResult.contextId'),
        source: controller.get('source')
      };
      this.transitionTo(
        'reports.study-student-collection',
        { queryParams }
      );
    },

    loadPreTest: function() {
      this.refresh();
    }
  },

  // -------------------------------------------------------------------------
  // Methods
  model: function(params) {
    const route = this;

    //Steps for Take a Tour functionality
    const tourSteps = Ember.A([
      {
        title: route.get('i18n').t('gru-take-tour.study-player.stepOne.title'),
        description: route.get('i18n').t('gru-take-tour.study-player.stepOne.description')
      },
      {
        elementSelector: '.header-panel .course-info .course-title',
        title: route.get('i18n').t('gru-take-tour.study-player.stepTwo.title'),
        description: route.get('i18n').t('gru-take-tour.study-player.stepTwo.description')
      },
      {
        elementSelector: '.header-panel .performance-info .graphic',
        title: route.get('i18n').t('gru-take-tour.study-player.stepThree.title'),
        description: route.get('i18n').t('gru-take-tour.study-player.stepThree.description')
      },
      {
        elementSelector: '.header-panel .course-info .actions .course-map',
        title: route.get('i18n').t('gru-take-tour.study-player.stepFive.title'),
        description: route.get('i18n').t('gru-take-tour.study-player.stepFive.description')
      },
      /*{
        elementSelector: '.header-panel .performance-info .suggestions',
        title: route.get('i18n').t('gru-take-tour.study-player.stepSeven.title'),
        description: route.get('i18n').t('gru-take-tour.study-player.stepSeven.description')
      },*/
      {
        title: route.get('i18n').t('gru-take-tour.study-player.stepEight.title'),
        description: route.get('i18n').t('gru-take-tour.study-player.stepEight.description')
      }
    ]);

    return route.getMapLocation(params).then(function (mapLocation) {
      const courseId = mapLocation.get('context.courseId');
      const unitId = mapLocation.get('context.unitId');
      const lessonId = mapLocation.get('context.lessonId');

      return Ember.RSVP.hash({ //loading breadcrumb information and navigation info
        course: route.get('courseService').fetchById(courseId),
        unit: route.get('unitService').fetchById(courseId, unitId),
        lesson: route.get('lessonService').fetchById(courseId, unitId, lessonId)
      }).then(function (hash) {

        //setting query params using the map location
        params.collectionId = mapLocation.get('context.itemId') || mapLocation.get('context.collectionId');
        params.type = mapLocation.get('context.itemType') || mapLocation.get('context.collectionType');
        params.classId = params.classId || mapLocation.get('context.classId');
        params.unitId = params.unitId || mapLocation.get('context.unitId');
        params.lessonId = params.lessonId || mapLocation.get('context.lessonId');
        params.pathId = params.pathId || mapLocation.get('context.pathId');
        params.collectionSubType = params.subtype || mapLocation.get('context.collectionSubType');

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
        return route.playerModel(params).then(function (model) {
          return Object.assign(model, {
            tourSteps: tourSteps,
            course: hash.course,
            unit: hash.unit,
            lesson: hash.lesson,
            mapLocation,
            collectionId: params.collectionId,
            type: params.type
          });
        });
      });
    });
  },

  setupController(controller, model) {
    const isAnonymous = model.isAnonymous;
    const mapLocation = model.mapLocation;
    controller.setProperties({
      steps: model.tourSteps,
      course: model.course,
      unit: model.unit,
      lesson: model.lesson,
      showConfirmation: model.collection && !(model.collection.get('isCollection') || isAnonymous), //TODO: move to computed
      mapLocation: model.mapLocation,
      classId: mapLocation.get('context.classId'),
      //setting query params variables using the map location
      unitId: mapLocation.get('context.unitId'),
      lessonId: mapLocation.get('context.lessonId'),
      collectionId: model.collectionId,
      type: model.type
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
    const pathId = params.pathId;
    const collectionSubType = params.subtype;

    const continueCourse = !unitId;
    const startLesson = lessonId && !collectionId;

    const navigateMapService = route.get('navigateMapService');

    let mapLocationPromise = null;
    if (continueCourse) {
      mapLocationPromise = navigateMapService.getCurrentMapContext(courseId, classId)
        .then(mapContext => navigateMapService.next(mapContext, false));
    } else if (startLesson) {
      mapLocationPromise = navigateMapService.startLesson(
        courseId, unitId, lessonId, classId
      );
    } else if (collectionSubType) {
      mapLocationPromise = navigateMapService.startSuggestion(
        courseId, unitId, lessonId, collectionId, collectionType,
        collectionSubType, pathId, classId
      );
    } else {
      mapLocationPromise = navigateMapService.startCollection(
        courseId, unitId, lessonId, collectionId, collectionType, classId
      );
    }
    return mapLocationPromise;
  },

  deactivate: function() {
    this.get('controller').resetValues();
  }
});
