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

  classNames: ['gru-pie-chart'],
  // -------------------------------------------------------------------------
  // Events


  didInsertElement: function(){

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
  radius :(Math.min(this.get("width"), this.get("heigh")) / 2),

  /**
   * @property {D3.Object} color
   */
  color : d3.scale.ordinal()
    .range(["#98abc5", "#8a89a6", "#7b6888"]),

  /**
   * @property {Array} data
   * Data to graphic
   */
  data :[{"label":"Category A", "value":20},
    {"label":"Category B", "value":50},
    {"label":"Category C", "value":30}],

  // -------------------------------------------------------------------------
  // Methods

  graphPie: function () {
    var vis = d3.select('#chart').append("svg:svg").data([data]).attr("width", this.get("width")).attr("height", this.get("height")).append("svg:g").attr("transform", "translate(" + this.get("radius") + "," + this.get("radius")+ ")");
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
        //Log the result of the arc generator to show how cool it is :)
        console.log(arc(d));
        return arc(d);
      });
  }

});
