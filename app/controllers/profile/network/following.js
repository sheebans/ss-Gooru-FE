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
          controller.get('followings').removeObject(user);
          controller.set('countFollowings', countFollowings-1);
          controller.set('isFollowing', false);
        });
    }
  },
  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {User[]} followings
   */
  followings: null,

  /**
   * @property {boolean} isMyProfile
   */
  isMyProfile: Ember.computed.alias("profileController.isMyProfile"),

  /**
   * @property {Number} counter of profile followings
   */
  countFollowings: Ember.computed.alias("profileController.profile.followings"),

  /**
   * @property {boolean} isFollowing
   */
  isFollowing: Ember.computed.alias("profileController.profile.isFollowing")

});
