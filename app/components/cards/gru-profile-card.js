import Ember from 'ember';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['cards gru-profile-card'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     *
     * Triggered when the name or the image of the user is selected
     * @param userId
     */
    selectUser: function (userId) {
      this.get('onProfileSelect')(userId);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * A user's profile information
   * @property {Profile}
   */
  "profile": null
});
