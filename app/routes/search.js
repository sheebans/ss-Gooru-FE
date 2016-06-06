import Ember from 'ember';
import { checkStandards } from 'gooru-web/utils/utils';
import {K12_CATEGORY} from 'gooru-web/config/config';
import TaxonomyRoot from 'gooru-web/models/taxonomy/taxonomy-tag-data';
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
    },
    taxonomies: {
      refreshModel: true
    }
  },

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service("taxonomy"),

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function() {
    var subjects = this.get('taxonomyService').getSubjects(K12_CATEGORY.value);
    return Ember.RSVP.hash({
      subjects: subjects
    });
  },
  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("subjects", model.subjects);
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
