import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    openContentPlayer: function(assessmentId) {
      this.transitionToRoute('player', assessmentId);
    }
  },

  // -------------------------------------------------------------------------
  // Dependencies

  profileController: Ember.inject.controller('profile'),


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Assessment[]} assessments
   */
  assessments: null,

  /**
   * @property {boolean} isMyProfile
   */
  isMyProfile: Ember.computed.alias("profileController.isMyProfile")

});
