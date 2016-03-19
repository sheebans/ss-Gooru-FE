import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';

export default Ember.Controller.extend(SessionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  profileService: Ember.inject.service('api-sdk/profile'),

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
  },

  saveProfile(profile) {
    this.get('profileService').updateMyProfile(profile);
  }

});
