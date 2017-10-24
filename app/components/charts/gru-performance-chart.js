import Ember from 'ember';
import { getBarGradeColor } from 'gooru-web/utils/utils';
import { roundFloat } from 'gooru-web/utils/math';

/**
 * Performance and Completion Chart
 *
 * Component responsible for showing the Performance and Completion Chart.
 * This component takes the dimensions of height and width from the parent element.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['charts', 'gru-performance-chart'],

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Events

  didRender: function() {
    this.$('[data-toggle="tooltip"]').tooltip();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates if it is a teacher
   * @property {boolean}
   */
  isTeacher: false,

  /**
   * @property {Performance} Performance summary
   */
  performanceSummary: null,

  /**
   * @property {Text} score text
   * Computed property for the performance score text to be displayed
   */
  scoreText: Ember.computed('performanceSummary.score', function() {
    const scorePercentage = this.get('performanceSummary.score');
    return scorePercentage >= 0 && scorePercentage !== null
      ? `${scorePercentage}%`
      : '--';
  }),

  /**
   * @property {Boolean} hasStarted
   * Computed property to know if course has started
   */
  hasStarted: Ember.computed('performanceSummary', function() {
    const completed = this.get('performanceSummary.totalCompleted');
    const total =
      completed > this.get('performanceSummary.total')
        ? completed
        : this.get('performanceSummary.total');
    const percentage = completed ? parseInt(completed / total * 100) : 0;
    return this.get('performanceSummary') !== null && percentage;
  }),

  /**
   * @property {Number} completionPercentage
   * Computed property to calculate the completion percentage
   */
  completionPercentage: Ember.computed('performanceSummary', function() {
    const completed =
      this.get('performanceSummary.totalCompleted') ||
      this.get('performanceSummary.completionDone');
    const total =
      this.get('performanceSummary.total') ||
      this.get('performanceSummary.completionTotal');
    return completed ? roundFloat(completed / total * 100) : 0;
  }),

  /**
   * @property {Number} tooltipText
   * Computed property to show the tooltipText
   */
  tooltipText: Ember.computed('performanceSummary', function() {
    const completed =
      this.get('performanceSummary.totalCompleted') ||
      this.get('performanceSummary.completionDone') ||
      0;
    const total =
      this.get('performanceSummary.total') ||
      this.get('performanceSummary.completionTotal');

    const percentage = completed ? roundFloat(completed / total * 100) : 0;
    var tooltipText = `${percentage}% ${this.get('i18n').t('common.completed')
      .string}`;

    return tooltipText;
  }),

  /**
   * @property {String} widthStyle
   * Computed property to know the width of the bar
   */
  widthStyle: Ember.computed('completionPercentage', function() {
    const completion = this.get('completionPercentage');
    return Ember.String.htmlSafe(`width: ${completion}%;`);
  }),

  /**
   * @property {String} barColor
   * Computed property to know the color of the small bar
   */
  colorStyle: Ember.computed('performanceSummary', function() {
    let score = this.get('performanceSummary.score');
    return Ember.String.htmlSafe(
      `background-color: ${getBarGradeColor(score)};`
    );
  }),

  /**
   * @property {Boolean} isFull
   * Computed property to know if the completion is full
   */
  isFull: Ember.computed('completionPercentage', function() {
    return this.get('completionPercentage') >= 100;
  })
});
