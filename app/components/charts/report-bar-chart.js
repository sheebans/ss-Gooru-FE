import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['charts', 'report-bar-chart'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Number of bars should in one item
   * @type {[type]}
   */
  numberOfBars: 12,

  /**
   * Stutent chart report data
   * @type {Object}
   */
  studentChartReportData: null,

  /**
   * Data slipt for each carousel item
   * @type {[type]}
   */
  dataSet: Ember.computed('studentChartReportData', function() {
    let studentChartReportData = this.get('studentChartReportData');
    let numberOfBars = this.get('numberOfBars');
    let data = Ember.A([]);
    for (
      let index = 0, index1 = studentChartReportData.length;
      index < index1;
      index += numberOfBars
    ) {
      data.push(studentChartReportData.slice(index, index + numberOfBars));
    }
    return data;
  }),

  /**
   * This attribute will decide which field to use for chart
   * @type {Boolean}
   */
  useTimeSpentScore: false,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    onClickChart(userId) {
      this.sendAction('onClickChart', userId);
    },

    onClickPrev() {
      this.$('#report-bar-carousel-wrapper').carousel('prev');
    },

    onClickNext() {
      this.$('#report-bar-carousel-wrapper').carousel('next');
    }
  }

  // -------------------------------------------------------------------------
  // Events
});
