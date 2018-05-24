import Ember from 'ember';
/**
 * Study Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default Ember.Controller.extend({
  queryParams: [
    'collectionUrl',
    'unitId',
    'lessonId',
    'collectionId',
    'pathId',
    'source',
    'collectionType',
    'classId'
  ],

  actions: {},

  // ------------------------------------------------------------------------
  // Dependencies

  /**
   * @dependency {i18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {boolean}
   */
  isDone: false,

  /**
   * Show the next button and send events
   * @property {Boolean} sendEvents
   */
  sendEvents: Ember.computed.not('collectionUrl'),

  /**
   * Extracted the course version from course object
   * @property {String}
   */
  courseVersion: Ember.computed.alias('course.version'),

  /**
   * @property {String} It decide to show the back to course map or not.
   */
  showBackToCourseMap: false,

  /**
   * @property {String} It decide to show the back to collection or not.
   */
  showBackToCollection: true,

  /**
   * Indicates if it should default player header
   * @property {boolean}
   */
  showPlayerHeader: true,

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
        elementSelector: '.header-panel .back-to-collection',
        title: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepNine.title'),
        description: controller
          .get('i18n')
          .t('gru-take-tour.study-player.stepNine.description')
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
  })
});
