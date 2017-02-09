import Ember from 'ember';
import PublicRouteMixin from "gooru-web/mixins/public-route-mixin";

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend(PublicRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service('taxonomy'),

  /**
   * @requires service:api-sdk/taxonomy
   */
  taxonomySdkService: Ember.inject.service('api-sdk/taxonomy'),

  queryParams: {
    term: {
      /**
       Only 'term' query param should refresh the entire model, since the event is handled by
       the application route. Other query params are handled by the collection controller

       @see routes/application.js#searchTerm
       */
      refreshModel: true
    },
    taxonomies: {
      refreshModel: true
    }
  },

  model: function(params) {
    const taxonomyIds = params.taxonomies;
    let taxonomyCodes = [];
    let subjects = [];

    if (taxonomyIds.length > 0) {
      taxonomyCodes = this.get('taxonomySdkService').fetchCodesByIds(taxonomyIds);
      subjects = this.get('taxonomyService').fetchSubjectsByIds(taxonomyIds);
    }

    return Ember.RSVP.hash({
      taxonomyCodes: taxonomyCodes,
      subjects: subjects
    });
  },
  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('subjects', model.subjects);
    controller.set('taxonomyCodes', model.taxonomyCodes);
    controller.reloadTaxonomyTags();
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
        this.transitionTo('player', collection.get("id"), { queryParams: { type: collection.get("collectionType") } });
      }
    }
  }

});
