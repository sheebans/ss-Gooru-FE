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
   * @property {User[]} class students
   */
  students:null,

  /**
   * A link to the computed property isStudent in class controller
   * @see controllers/class.js
   * @property {isStudent}
   */
  "isStudent": Ember.computed.reads('classController.isStudent')
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
