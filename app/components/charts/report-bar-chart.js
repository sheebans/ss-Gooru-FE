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
  })

  // -------------------------------------------------------------------------
  // Events

  /**
   * Function to triggered once when the component element is first rendered.
   */
  /*didInsertElement() {
    let component = this;
  }*/
});
