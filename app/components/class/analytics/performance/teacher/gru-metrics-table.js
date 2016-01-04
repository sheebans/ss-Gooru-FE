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
   * The performanceData by user
   * @property {performanceData[]}
   */

  performanceData: null,

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
  selectedOptions: Ember.A(["score"])

  // -------------------------------------------------------------------------

  // Methods

});
