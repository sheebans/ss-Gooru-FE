import Ember from "ember";

/**
 *
 * Controls the access to the analytics data for a
 * class related to a collection of resources
 *
 */

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  classController: Ember.inject.controller('class'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    setAnonymous: function () {
      this.set("anonymous", !this.get("anonymous"));
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Collection} assessment
   */
  assessment: null,

  /**
   * @property {User[]} students
   */
  students: Ember.A([]),

  /**
   * @prop { UserQuestionsResult[] } userResults - Content feed to update the report data
   */
  userResults: null,

  /**
   * @property {boolean}
   */
  anonymous: false


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
