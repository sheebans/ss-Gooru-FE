import Ember from 'ember';

/**
 * Teacher Metrics Table
 *
 * Component responsible for showing the Metrics Table in the teacher page.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-metrics-table'],

  // -------------------------------------------------------------------------
  // Actions
    actions:{
      sortChange:function(option){
        console.log(option);
      },

      navigate:function(headerId){
        console.log('navigate');
        this.sendAction('onNavigation', headerId);
      }
    },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * The header titles
   * @property {Headers[]}
   */

  headers: null,

  /**
   * The performanceDataMatrix
   * @property {performanceDataMatrix[]}
   */

  performanceDataMatrix: null,

  /**
   * The average headers of the Data Matrix
   * @property {averageHeaders[]}
   */
  averageHeaders: Ember.computed('performanceDataMatrix.length', function() {
    const averageHeaders = this.get('performanceDataMatrix').objectAt(0);
    return averageHeaders;
  }),

  /**
   * The user performanceData
   * @property {performanceData[]}
   */
  performanceData: Ember.computed('performanceDataMatrix.length', function() {
    const performanceData = this.get('performanceDataMatrix').slice(1);
    return performanceData;
  }),

  /**
   * List of  metrics to be displayed by the sub-header component for the average
   * @sorted {Boolean}
   * @isAsc {Boolean}
   * @constant {Array}
   */
  averageMetrics: Ember.A([Ember.Object.create({
    'value': 'name',
    'sorted':false,
    'isAsc':false,
    'visible': true
  })]),

  /**
   * List of selected options from the data picker.
   * @property {Array}
   */
  dataPickerOptions: Ember.A(["score"])

  // -------------------------------------------------------------------------

  // Methods

});
