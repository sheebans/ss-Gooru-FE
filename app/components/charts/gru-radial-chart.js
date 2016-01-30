import Ember from 'ember';
import { radialProgress } from 'gooru-web/utils/d3/radial-progress';

/**
 * Completion Information Chart
 *
 * Component responsible for showing a radial progress chart.
 *
 * Radial Progress chart taken from d3.org
 * @see http://www.brightpointinc.com/download/radial-progress-source-code/
 *
 * @module
 * @augments ember/Component
 */

// -------------------------------------------------------------------------
// Private Variables

var radialChart,  // Radial chart instance
  width,        // Width of the chart calculated from the css
  height;       // Height of the chart calculated from the css


export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['charts', 'gru-radial-chart'],


  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function(){
    const $component = this.$();
    const minValue = this.get('minValue');
    const maxValue = this.get('maxValue');
    const value = this.get('value');

    // Get the component dimensions from the css
    width = parseInt($component.css('width').split('px')[0]);
    height = parseInt($component.css('height').split('px')[0]);

    radialChart = radialProgress(this.element)
      .margin({top: 0, right: 0, bottom: 0, left: 0})
      .diameter(Math.min(height, width))
      .value(value)
      .minValue(minValue)
      .maxValue(maxValue);

    if (!this.get('showPercentageLabel')) {
      radialChart.__textDisplay(value + '/' + maxValue);
    }

    radialChart.render();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} minValue - Lowest value for the graph
   */
  minValue: 0,

  /**
   * @property {Number} maxValue - Highest value for the graph
   */
  maxValue: 1,

  /**
   * @property {boolean} showPercentageLabel - Show the percentage label
   * provided by the radial progress chart by default
   */
  showPercentageLabel: false,

  /**
   * @property {String} value - Value to graph
   * It should be between minValue and maxValue
   */
  value: 0,


  renderChart: Ember.observer('value', function () {
    const maxValue = this.get('maxValue');
    const value = this.get('value');

    radialChart.value(value);

    if (!this.get('showPercentageLabel')) {
      radialChart.__textDisplay(value + '/' + maxValue);
    }

    radialChart.render();
  })

});
