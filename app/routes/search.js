import Ember from 'ember';
import { checkStandards } from 'gooru-web/utils/utils';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend({

  queryParams: {
    term: {
      /**
       Only 'term' query param should refresh the entire model, since the event is handled by
       the application route. Other query params are handled by the collection controller

       @see routes/application.js#searchTerm
       */
      refreshModel: true
    }
  },

  /**
   * @property {Ember.Service} Service to retrieve standards
   */
  standardService: Ember.inject.service("api-sdk/standard"),

  /**
   * @property {Ember.Service} Service to retrieve profiles
   */
  profileService: Ember.inject.service("api-sdk/profile"),

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function() {
    var standards = this.get("standardService").readAll();
    var profile = this.get("profileService").findByCurrentUser();
    return Ember.RSVP.hash({
      standards: standards,
      profile: profile
    });
  },
  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    this._super(controller, model);
    if (model.profile) {
      var checkableStandards = this.get("standardService").getCheckableStandards();
      //TODO load preferences var codes = model.profile.get("user.metadata.taxonomyPreference.code");
      var codes = model.standards; //for now all are enabled
      checkStandards(model.standards, checkableStandards, codes);
    }
    controller.set("standards", model.standards);
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {
    /**
     * Action triggered to open the content player
     * @param {string} collection collection identifier
     */
    onOpenContentPlayer: function(collection) {
      if (collection.get("isExternalAssessment")){
        window.open(collection.get("url")); //TODO url?
      }
      else {
        this.transitionTo('player', collection.get("id"));
      }
    }
  }
});
