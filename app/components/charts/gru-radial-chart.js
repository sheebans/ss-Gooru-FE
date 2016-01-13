/**
 * Completion Information Chart
 *
 * Component responsible for showing the completion information chart.
 *
 * @module
 * @augments ember/Component
 */
import Ember from 'ember';
import {radialProgress} from 'gooru-web/utils/d3/radial-progress';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-radial-chart', 'table-cell'],
  // -------------------------------------------------------------------------
  // Events


  didInsertElement: function(){
    radialProgress(this.element)
       .diameter(80)
       .value(this.get("completePercent"))
       .__textDisplay(this.get("text"))
       .__width(50)
       .__height(50)
       .minValue(this.get("minValue"))
       .maxValue(this.get("maxValue"))
       .render();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {String} completePercent
   */
  completePercent: null,

  /**
   * @property {String} text to display in the graphic
   */
  text: "",

  /**
   * @property {Number} minValue to create the graph
   */
  minValue: null,

  /**
   * @property {Number} maxValue to create the graph
   */
  maxValue: null,

});
