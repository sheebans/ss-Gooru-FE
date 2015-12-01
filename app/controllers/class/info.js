import Ember from "ember";

/**
 * Class Information controller
 *
 * Controller responsible of the logic for the class information page
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  classController: Ember.inject.controller('class'),

  // -------------------------------------------------------------------------
  // Actions

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


  students:null,
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
