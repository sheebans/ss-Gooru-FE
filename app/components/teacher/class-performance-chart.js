import Ember from 'ember';
import d3 from 'd3';

/**
 * time Spent activities chart
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  //------------------------------------------------------------------------
  //Dependencies

  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['class-performance-chart'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    const $component = this.$();
    // Get the component dimensions from the css
    this.setProperties({
      height: parseInt($component.height()),
      width: parseInt($component.width()),
      radius: 95
    });
    this.drawchart();

  },

  /**
   * Observer to watch data changes
   */
  dataObserver: Ember.observer('data', function() {
    d3.select('svg').remove();
    this.drawchart();
  }),

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
   * Data of courses and independent journeys count
   * @return {Array}
   */
  data: Ember.A([]),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * @function drawchart
   * Method to draw donut chart based on the class performance
   */
  drawchart: function() {
    let component = this;
    let width = component.get('width');
    let height = component.get('height');
    let data = component.get('data');
    let radius = component.get('radius');
    let performanceColor = component.get('performanceColor');
    let svg = d3.select(component.element)
      .append('svg')
      .attr('class', 'pie')
      .attr('width', width)
      .attr('height', height);

    let g = svg.append('g')
      .attr('transform', `translate(${  width / 2  },${  height / 2  })`);

    let arc = d3.svg.arc()
      .innerRadius(115)
      .outerRadius(radius);

    let pie = d3.layout.pie()
      .value(function(d) {
        return d.score;
      })
      .sort(null);
    pie.padAngle(0.05);

    let arcs = g.selectAll('arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');
    arcs.append('path')
      .attr('d', arc)
      .attr('fill', performanceColor)
      .each(function(d, i) {
        this._current = i;
      });
    let text = g.append('svg:foreignObject')
      .attr('width', 100).attr('height', 100)
      .attr('x', -50)
      .attr('y', -50);
    text.append('xhtml:div')
      .style('background-color', performanceColor)
      .attr('class', 'performance-score').text(`${data[0].score  }%`);

  }

});
