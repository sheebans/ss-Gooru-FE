import Ember from 'ember';
import { getBarGradeColor } from 'gooru-web/utils/utils';
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
  // Properties
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

  barColor: Ember.computed('performanceSummary', function() {
    let score = this.get('performanceSummary.score');
    return Ember.String.htmlSafe(getBarGradeColor(score));
  }),

  /**
   * @property {[Number]} completionData
   */
  completionData: Ember.computed('performanceSummary', function() {
    const completed = this.get('performanceSummary.totalCompleted');
    const total = this.get('performanceSummary.total');
    const percentage = completed ? completed / total * 100 : 0;
    return [
      {
        percentage
      }
    ];
  }),

  isFull: Ember.computed('completionData.[]', function() {
    var sum = this.get('completionData').reduce(function(previousValue, value) {
      return previousValue + value.percentage;
    }, 0);
    return sum >= 100;
  }),

  widthStyle: Ember.computed('completionData', function() {
    return this.get('completionData').map(function(questionData) {
      return Ember.String.htmlSafe(`width: ${questionData.percentage}%;`);
    });
  })

  // -------------------------------------------------------------------------
  // Events
});
