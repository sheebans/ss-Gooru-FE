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
    }
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

  performanceData: null
  // -------------------------------------------------------------------------

  // Methods

});
