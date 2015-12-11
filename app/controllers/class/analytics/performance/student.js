import Ember from 'ember';

/**
 * Student Analytics Performance Controller
 *
 * Controller responsible of the logic for the student performance
 *
 * @module
 * @see routes/analytics/performance/student.js
 * @augments ember/Controller
 */
export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('class'),
  queryParams: ['filterBy'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
    * Triggered when a filter option is selected
    * @param {string} option
    */
    selectFilterBy: function(option){
      this.set("filterBy", option);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * A link to the parent class controller
   * @see controllers/class.js
   * @property {Class}
   */
  "class": Ember.computed.reads('classController.class'),

  /**
   * The filterBy selected
   * @property {String}
   */
  filterBy: 'assessment'

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
