import Ember from 'ember';
import {
  ASSESSMENT_SUB_TYPES
} from 'gooru-web/config/config';
import PlayerController from 'gooru-web/controllers/player';

/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({
  queryParams: [
    'resourceId',
    'role',
    'type',
    'subtype',
    'sourceId',
    'classId',
    'unitId',
    'lessonId',
    'collectionId',
    'source',
    'pathId',
    'minScore'
  ],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {CourseMapService}
   */
  courseMapService: Ember.inject.service('api-sdk/course-map'),

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
     * If the user want to continue playing the collection
     */
    playActualCollection: function() {
      const navigateMapService = this.get('navigateMapService');
      navigateMapService
        .getStoredNext()
        .then(mapLocation => navigateMapService.next(mapLocation.context))
        .then(() => this.set('showSuggestion', false));
    },

    /**
     * If the user want to continue playing the suggestion
     */
    playSuggestion: function() {
      const controller = this;
      const courseMapService = controller.get('courseMapService');
      const suggestion = controller.get('mapLocation.preTestSuggestion');
      const context = controller.get('mapLocation.context');
      courseMapService.createNewPath(context, suggestion).then(function() {
        Ember.run(() =>
          controller.setProperties({
            resourceId: null,
            unitId: null,
            lessonId: null,
            collectionId: null,
            type: null
          })
        );
        //sending action to route
        controller.send('loadPreTest');
      });
    },

    loadPreTest: () => {
      return true;
    }
  },

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string}
   */
  classId: null,

  /**
   * @property {string}
   */
  unitId: null,

  /**
   * @property {string}
   */
  lessonId: null,

  /**
   * @property {string}
   */
  collectionId: null,

  /**
   * @property {string}
   */
  pathId: null,

  /**
   * student test report shows confetti badge.
   * @property {integer}
   */
  minScore: null,

  /**
   * Indicates if it should show the back button
   * @property {boolean}
   */
  showBackButton: false,

  /**
   * Indicate if show pre test suggestion
   * @property {Boolean} showSuggestion
   */
  showSuggestion: true,

  /**
   * Current map location
   * @property {MapLocation}
   */
  mapLocation: null,

  /**
   * @property {boolean}
   */
  hasPreTestSuggestions: Ember.computed.alias(
    'mapLocation.hasPreTestSuggestions'
  ),

  /**
   * Pre test suggestion
   * @property {String} typeSuggestion
   */
  typeSuggestion: ASSESSMENT_SUB_TYPES.PRE_TEST,

  /**
   * Course version Name
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version'),

  /**
   * @property {String} It decide to show the back to course map or not.
   */
  showBackToCourseMap: true,

  /**
   * @property {String} It decide to show the back to collection or not.
   */
  showBackToCollection: false,

  /**
   * Indicates if it should default player header
   * @property {boolean}
   */
  showPlayerHeader: false,

  /**
   * Steps for Take a Tour functionality
   * @property {Array}
   */
  steps: Ember.computed(function() {
    let controller = this;
    let steps = Ember.A([
      {
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepOne.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepOne.description')
      },
      {
        elementSelector: '.header-panel .course-map',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepTwo.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepTwo.description')
      },
      {
        elementSelector: '.header-panel .content-title',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepThree.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepThree.description')
      },
      {
        elementSelector: '.header-panel .suggest-player',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFour.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFour.description')
      },
      {
        elementSelector:
          '.header-panel .performance-completion-take-tour-info .completion',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFive.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepFive.description')
      },
      {
        elementSelector:
          '.header-panel  .performance-completion-take-tour-info .performance',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepSix.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepSix.description')
      },
      {
        elementSelector: '.qz-player-footer .qz-emotion-picker',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepSeven.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepSeven.description'),
        position: 'top'
      },
      {
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepEight.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepEight.description')
      }
    ]);
    return steps;
  }),

  /**
   * Resets to default values
   */
  resetValues: function() {
    //TODO: call the parent reset values method
    this.setProperties({
      showSuggestion: true,
      showBackToCourseMap: true,
      showBackToCollection: false,
      classId: null,
      unitId: null,
      lessonId: null,
      collectionId: null,
      resourceId: null,
      type: null
    });
  }
});
