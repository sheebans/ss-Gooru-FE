import Ember from 'ember';
import { checkStandards } from 'gooru-web/utils/utils';
import {K12_CATEGORY} from 'gooru-web/config/config';
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
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service("taxonomy"),

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),

  model: function() {
    var subjects = component.get('taxonomyService').getSubjects(K12_CATEGORY.value);
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
     * @param {string} collectionId gooruOid collection identifier
     */
    onOpenContentPlayer: function(collectionId) {
      this.transitionTo('player', collectionId);
    }
  }
});
