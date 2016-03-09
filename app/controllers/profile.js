import Ember from 'ember';

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
   * Indicates if the user is seeing his own profile
   * @property {isMyProfile}
   * @see {Class} profile
   * @returns {bool}
   */
  isMyProfile: Ember.computed('profile', function() {
    return this.get('profile').get('id') === this.get("session.userId");
  }),

  /**
   * The profile presented to the user
   * @property {Profile}
   */
  profile: null,

  /**
   * The menuItem selected
   * @property {String}
   */
  menuItem: null,


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Selected the menu item
   * @param {string} item
   */
  selectMenuItem: function(item){
    this.set("menuItem", item);
  }
});
