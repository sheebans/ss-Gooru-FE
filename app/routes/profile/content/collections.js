import Ember from 'ember';

export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * On card edit collection button click
     * @param {Content/Collection} collection
     */
    editCollection: function (collection) {
      this.transitionTo("content.collections.edit", collection.get("id"));
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function (){
    const profile = this.modelFor("profile").profile;
    return this.get("profileService").readCollections(profile.get("id"));
  },

  setupController: function (controller , model) {
    controller.set("collections", model);
  }


});
