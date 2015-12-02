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

  /**
   * A link to the parent menuItem property
   * @see controllers/selectedMenuItem.js
   * @property {String}
   */
  "selectedMenuItem": Ember.computed.alias('classController.menuItem'),

  students:null
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
