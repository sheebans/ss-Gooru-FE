/**
 *Pie Chart
 *
 * Component responsible for showing the pie chart.
 *
 * @module
 * @augments ember/Component
 */
import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({
  // Attributes

  classNames: ['gru-pie-chart','charts'],
  // -------------------------------------------------------------------------
  // Events


  didInsertElement: function(){
    if(!this.validValues()){
      Ember.Logger.warn('Invalid values to graph');
    }
    this.graphPie();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Number} width
   */
  width: null,

  /**
   * @property {Number} height
   */
  height: null,

  /**
   * @property {Number} radius
   */
  radius : Ember.computed('width','heigh', function() {
    return(Math.min(this.get("width"), this.get("height")) / 2);
  }),

  /**
   * @property {D3.Object} color
   */
  colorScale : Ember.computed('colors', function() {
    return d3.scale.ordinal().range(this.get("colors"));
  }),

  /**
   * @property {Array} data
   * Data to graphic
   */
  values : Ember.computed('pieData', function() {
    return this.get('pieData').map(function(obj) {
      return {value:obj.value};
    });
  }),

  /**
   * @property {Array} colors
   * List of color to graphic
   */
  colors:Ember.computed('pieData',function(){
    return this.get('pieData').map(function(obj) {
      return obj.color;
    });
  }),

  /**
   * @property {Array} data
   * Data to graphic
   */
  pieData :null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Graphic a pie chart with d3 library
   */
  graphPie: function () {
    var color =  this.get('colorScale');
    var vis = d3.select("#"+this.elementId).append("svg:svg").data([this.get("values")]).attr("width", this.get("width")).attr("height", this.get("height")).append("svg:g").attr("transform", "translate(" + this.get("radius") + "," + this.get("radius")+ ")");
    var pie = d3.layout.pie().value(function(d){return d.value;});

    //Declare an arc generator function
    var arc = d3.svg.arc().outerRadius(this.get("radius"));

    //Select paths, use arc generator to draw
    var arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
    arcs.append("svg:path")
      .attr("fill", function(d, i){
        return color(i);
      })
      .attr("d", function (d) {
        return arc(d);
      });
  },
  /**
   * Check if the values are up 100%
   */
  validValues:function(){
    var values = this.get("values");
    var sum=0;
    values.forEach(function(value){
      sum+=parseInt(value.value);
    });
    return (sum === 100) ? true : false;
  }

});
