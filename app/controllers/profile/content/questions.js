import Ember from 'ember';

export default Ember.Controller.extend({



  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Collection[]} questions
   */
  questions: null,

  /**
   * @property {boolean} isMyProfile
   */
  isMyProfile: Ember.computed.alias("profileController.isMyProfile")

});
