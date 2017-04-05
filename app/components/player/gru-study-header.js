import Ember from 'ember';
import { ANONYMOUS_COLOR, STUDY_PLAYER_BAR_COLOR } from 'gooru-web/config/config';

/**
 * Study Player header
 *
 * Component responsible for showing an informative header for the study player.
 * It may embed other components for interacting with the player.
 *
 * @module
 * @see controllers/study-player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ClassService} Service to retrieve class information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @type {PerformanceService} Service to retrieve class performance summary
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-study-header'],
  classNameBindings: ['toggleState:expanded:collapsed', 'showConfirmation:hidden'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Redirect to course map
     */
    redirectCourseMap(){
      this.get('router').transitionTo('student.class.course-map', this.get('classId'), { queryParams: { refresh: true } });
    },

    /**
     * Action triggered when the performance information panel is expanded/collapsed
     */
    toggleHeader() {
      this.toggleProperty('toggleState');
      this.sendAction('onToggleHeader', this.get('toggleState'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super( ...arguments );
    const controller = this;
    const classId = this.get('classId');

    controller.get('classService').readClassInfo(classId).then(function(aClass) {
      controller.get('performanceService').findClassPerformanceSummaryByClassIds([classId]).then(function(classPerformanceSummaryItems) {
        aClass.set('performanceSummary', classPerformanceSummaryItems.findBy('classId', classId));
        controller.set('class', aClass);
      });
    });
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Class} class information
   */
  class: null,

  /**
   * @property {string} classId - Class unique Id associated for the collection / assessment.
   */
  classId: null,

  /**
   * @property {String} color - Hex color value for the bar in the bar chart
   */
  color: ANONYMOUS_COLOR,

  /**
   * @property {String} color - Hex color value for the default bgd color of the bar chart
   */
  defaultBarColor: STUDY_PLAYER_BAR_COLOR,

  /**
   * Shows the performance information
   * @property {Boolean} toggleState
   */
  toggleState: true,

  /**
   * @property {Number} barChartData
   */
  barChartData: Ember.computed('class.performanceSummary', function () {
    const completed = this.get('class.performanceSummary.totalCompleted');
    const total = this.get('class.performanceSummary.total');
    const percentage = (completed) ? (completed/total)*100 : 0;

    return [
      {
        color: this.get('color'),
        percentage: percentage
      }
    ];
  })

  // -------------------------------------------------------------------------
  // Methods

});
