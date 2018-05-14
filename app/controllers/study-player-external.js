import Ember from 'ember';
import { ROLES } from 'gooru-web/config/config';

/**
 * Study Player External Controller
 *
 * @module
 */
export default Ember.Controller.extend({
  queryParams: [
    'resourceId',
    'role',
    'type',
    'sourceId',
    'classId',
    'courseId',
    'collectionId',
    'source'
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
     * Action triggered for the next button
     */
    next: function() {
      this.playNextContent();
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
  courseId: null,

  /**
   * @property {string}
   */
  collectionId: null,

  /**
   * Indicates if it should show the back button
   * @property {boolean}
   */
  showBackButton: false,

  /**
   * @property {String} It decide to show the back to course map or not.
   */
  showBackToCourseMap: true,

  /**
   * Indicates if it should default player header
   * @property {boolean}
   */
  showPlayerHeader: false,

  /**
   * Current map location
   * @property {MapLocation}
   */
  mapLocation: null,

  /**
   * Resets to default values
   */
  resetValues: function() {
    //TODO: call the parent reset values method
    this.setProperties({
      collectionId: null,
      resourceId: null,
      type: null
    });
  },

  /**
   * Extracted the course version from course object
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version'),

  /**
   * @property {String} It decide to show the back to collection or not.
   */
  showBackToCollection: false,

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

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Navigate to study player to play next collection/assessment
   */
  toPlayer: function() {
    const context = this.get('mapLocation.context');
    let queryParams = {
      role: ROLES.STUDENT,
      source: this.get('source')
    };
    let classId = context.get('classId');
    if (classId) {
      queryParams.classId = classId;
    }
    this.transitionToRoute('study-player', context.get('courseId'), {
      queryParams
    });
  },

  playNextContent: function() {
    const navigateMapService = this.get('navigateMapService');
    const context = this.get('mapLocation.context');
    navigateMapService
      .getStoredNext()
      .then(() => navigateMapService.next(context))
      .then(mapLocation => {
        let status = (mapLocation.get('context.status') || '').toLowerCase();
        if (status === 'done') {
          this.setProperties({
            isDone: true,
            hasAnySuggestion: false
          });
        } else {
          this.toPlayer();
        }
      });
  }
});
