import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),

  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    unFollowUser: function (user) {
      var controller = this;
      var userId = user.id;
      var countFollowings = controller.get('countFollowings');

      controller.get('profileService').unfollowUserProfile(userId)
        .then(function () {
          controller.set('countFollowings', countFollowings-1);
          user.set('followers', user.get('followers') - 1);
          user.set('isFollowing', false);
        });
    },

    followUser: function (user) {
      var controller = this;
      var userId = user.id;
      var countFollowings = controller.get('countFollowings');

      controller.get('profileService').followUserProfile(userId)
        .then(function () {
          controller.set('countFollowings', countFollowings+1);
          user.set('followers', user.get('followers') + 1);
          user.set('isFollowing', true);
        });
    }
  },

  /**
   * @property {User[]} followers
   */
  followers: null,

  /**
   * @property {boolean} isMyProfile
   */
  isMyProfile: Ember.computed.alias("profileController.isMyProfile"),

  /**
   * @property {Number} counter of profile followers
   */
  countFollowings: Ember.computed.alias("profileController.profile.followings")

});
