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

  model: function(params) {
    var standards = this.get("standardService").readAll();
    var profile = this.get("profileService").findByCurrentUser();
    var collectionResults = this.get('searchService').searchCollections(params);
    return Ember.RSVP.hash({
      standards: standards,
      profile: profile,
      collectionResults: collectionResults
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
      var codes = model.profile.get("user.metadata.taxonomyPreference.code");
      checkStandards(model.standards, checkableStandards, codes);
    }

    controller.set("standards", model.standards);
    controller.set('collectionResults', model.collectionResults);
  },

  // -------------------------------------------------------------------------
  // Actions - only transition actions should be placed at the route
  actions: {
    /**
     * Action triggered to open the content player
     * @param {string} collectionId gooruOid collection identifier
     */
    onOpenContentPlayer: function(collectionId) {
      this.transitionTo('player', collectionId);
    },

    /**
     * Action triggered to filter by type in collections page
     */
    filterType: function (term, filterType) {
      const route = this;
      const controller = route.get("controller");
      const searchService = route.get('searchService');

      if(filterType==='questions'){
        this.transitionTo('search.questions');
      }
      else {
        const params = {
          "term": term,
          "collectionType": filterType
        };
        searchService.searchCollections(params).then(function(collectionResults){
          controller.setProperties(params);
          controller.set("collectionResults", collectionResults);
        });
        this.transitionTo('search.collections');
      }
    }
  }
});
