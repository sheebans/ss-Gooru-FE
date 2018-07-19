import Ember from 'ember';
import d3 from 'd3';

export default Ember.Component.extend({

  classNames: ['monthly-time-series-chart'],

  didInsertElement() {
    if (this.get('showPullUp')) {
      this.drawChart();
    }
  },

  obs: Ember.observer('showPullUp', function() {
    if (this.get('showPullUp')) {
      this.drawChart();
    }
  }),

  drawChart() {
    let component = this;

    d3.select('svg.time-series').remove();
    // Config SVG
    let width = 700,
      height = 100;

    let date = new Date();
    let curYear = date.getFullYear();

    // Define d3 xScale
    let x = d3.time.scale()
      .domain([new Date(curYear, 0), new Date(curYear, 11)])
      .range([0, width - 40]);

    // Define main d3 xAxis
    let xAxis = d3.svg.axis()
      .scale(x)
      .tickFormat(d3.time.format('%b \'%y'))
      .tickPadding(14);

      // Draw SVG element
    let svgContainer = d3.select(component.element).append('svg');

    // Draw axes
    let axes = svgContainer
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(20,30)')
      .call(xAxis);

    svgContainer
      .attr('width', width)
      .attr('height', height)
      .attr('class', 'time-series')
      .call(d3.behavior.zoom()
        .x(x)
        .scaleExtent([1, 1])
        .on('zoom', function() {
          axes.call(xAxis);
          component.bindTicksClickable();
        }));


    component.bindTicksClickable();


  },

  bindTicksClickable() {
    let component = this;
    let ticksContainer = d3.selectAll('.tick');
    ticksContainer
      .attr('y', function(date) {
        let tickCotainer = d3.select(this);
        let curDate = new Date();
        let curMonth = curDate.getMonth();
        let curYear = curDate.getFullYear();
        let curTickMonth = date.getMonth();
        let curTickYear = date.getFullYear();
        if (curMonth === curTickMonth && curYear === curTickYear) {
          d3.select('circle.active-month').remove();
          tickCotainer.append('circle')
            .attr('cx', 0)
            .attr('cy', 0)
            .attr('r', 10)
            .attr('class', 'active-month');
        }
      })
      .on('click', function(date) {
        d3.select('circle.active-month').remove();
        d3.select(this).append('circle')
          .attr('cx', 0)
          .attr('cy', 0)
          .attr('r', 10)
          .attr('class', 'active-month');
        component.sendAction('onSelectMonth', date);
      });
  }
});
