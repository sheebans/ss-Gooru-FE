import Ember from 'ember';
import { checkStandards } from '../../utils/utils';

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
   * @property {Ember.Service} Service to retrieve grades
   */
  gradeService: Ember.inject.service("api-sdk/grade"),

  /**
   * @property {Ember.Service} Service to retrieve subjects
   */
  subjectService: Ember.inject.service('api-sdk/subject'),

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
    var subjects = this.get("subjectService").readAll();
    var grades = this.get("gradeService").readAll();
    var standards = this.get("standardService").readAll();
    var profile = this.get("profileService").findByCurrentUser();
    var collectionResults = this.get('searchService').searchCollections(params);
    return Ember.RSVP.hash({
      subjects: subjects,
      grades: grades,
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
    // @TODO We are filtering by library == "library value, we need to verify if this is the correct filter value.
    controller.set("subjects", model.subjects.filterBy("library", "library"));
    controller.set("grades", model.grades);

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
    }
  }
});
