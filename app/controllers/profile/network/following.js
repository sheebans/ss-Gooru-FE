import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),

  profileService: Ember.inject.service('api-sdk/profile'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    unFollowUser: function () {

      var controller = this;

      console.log('unFollow', controller.get('profileController.profile.id'));
      //controller.get('profileService').unfollowUserProfile(controller.get('user.id'))
      //  .then(function () {
      //    controller.set('isFollowing', false);
      //    //component.get('profileService').readUserProfile(controller.get('profile.id'))
      //    //  .then(function(updatedProfile) {
      //    //    controller.set('profile', updatedProfile);
      //    //  });
      //  });

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
  isMyProfile: Ember.computed.alias("profileController.isMyProfile")

});
