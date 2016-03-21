import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';

export default Ember.Controller.extend(SessionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    toggleFollowingStatus() {
      this.set('isFollowed', !this.get('isFollowed'));
      if (this.get('isFollowed')) {
        // TODO: Make request that follows the user
      } else {
        // TODO: Make request that unfollows the user
      }
    }
  },

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

  /**
   * Indicates if the user is being followed
   * @property {Boolean} isFollowed
   */
  isFollowed: Ember.computed('profile', function() {
    let myId = this.get("session.userId");
    let followers = this.get("profile.followersList");
    if (myId && followers) {
      return followers.indexOf(myId) >= 0;
    } else {
      return false;
    }
  }),


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
