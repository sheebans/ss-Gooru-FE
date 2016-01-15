import Ember from 'ember';
/**
 * Stacked Horizontal Bar Chart
 *
 * Component responsible for showing the stacked horizontal bar chart.
 * This component takes the dimensions of height and width from the parent element.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['charts','gru-stacked-horizontal-bar-chart'],


  // -------------------------------------------------------------------------
  // Properties

  stackedBarData:null,

  // -------------------------------------------------------------------------
  // Events


  didInsertElement: function(){
    if(!this.validValues()){
      Ember.Logger.warn('Graph values sum more than 100');
    }
  },

  /*
  * Check if the values are up 100%
  */
  validValues:function(){
    var sum = this.get("stackedBarData").reduce(function(previousValue, value){
      return previousValue + parseInt(value.percentage);
    }, 0);
    return (sum <= 100);
  }

});
