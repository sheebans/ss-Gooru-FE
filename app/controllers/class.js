import Ember from "ember";

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * The class presented to the user
   * @property {Class}
   */
  "class": null,

   /**
   * The menuItem selected
   * @property {String}
   */
   menuItem: null,

  /**
   * Indicates if a user is a teacher of this class
   * @property {isTeacher}
   * @see {Class} class
   * @returns {bool}
   */
  isTeacher: Ember.computed('class', function() {
    return this.get('class').isTeacher(this.get("session.userId"));
  }),

  /**
   * Indicates if a user is a student of this class
   * @property {isStudent}
   * @see {Class} class
   * @returns {bool}
   */
  isStudent: Ember.computed('class', function() {
    return this.get('class').isStudent(this.get("session.userId"));
  })

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
