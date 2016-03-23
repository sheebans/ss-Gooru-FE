import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    updateProfile: function() {
      this.get('parentController').saveProfile(this.get('profile'));
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * A link to the parent profile property
   * @see controllers/profile.js
   * @property {Class}
   */
  profile: Ember.computed.reads('parentController.profile'),

  /**
   * A link to the computed property isMyProfile in profile controller
   * @see controllers/profile.js
   * @property {isMyProfile}
   */
  isMyProfile: Ember.computed.reads('parentController.isMyProfile'),

  /**
   * Temporary property that stores the list of school districts
   * TODO: Replace this with the proper endpoint returned data at integration phase
   */
  districts: Ember.A(["Riverside Unified School District", "Acalanes Union High School District", "Postville Community School District"])

});
