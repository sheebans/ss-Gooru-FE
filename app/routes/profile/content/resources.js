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
     * On card edit resource button click
     * @param {Resource} resource
     */
    editResource: function (resource) {
      this.transitionTo("content.resources.edit", resource.get("id"));
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function (){
    const profile = this.modelFor("profile").profile;
    return this.get("profileService").readResources(profile.get("id"));
  },

  setupController: function (controller , model) {
    controller.set("resources", model);
  }


});
