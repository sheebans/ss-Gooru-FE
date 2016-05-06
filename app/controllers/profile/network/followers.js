import Ember from 'ember';

export default Ember.Controller.extend({



  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {User[]} followers
   */
  followers: null,

  /**
   * @property {boolean} isMyProfile
   */
  isMyProfile: Ember.computed.alias("profileController.isMyProfile")

});
