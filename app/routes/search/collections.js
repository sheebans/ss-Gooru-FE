import Ember from 'ember';
import { checkStandards } from '../../utils/utils';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend({

  /**
   * @property {[]} query params supported
   */
  queryParams: {
    term: {
      refreshModel: true
    },
    gradeIds: 'gradeIds',
    subjectIds: 'subjectIds',
    collectionType: {
      refreshModel: true
    }
  },

  /**
   * @property {string} term filter
   */
  term: null,

  /**
   * @property {string} collections filter
   */
  collections: null,
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
      collectionResults: collectionResults,
      collectionType: params.collectionType
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
    controller.set('selectedCollectionType', model.collectionType);
  },

  actions: {
    /**
     * Action triggered to open the content player
     * @param {string} collectionIdgooruOid collection identifier
     */
    onOpenContentPlayer: function(collectionId) {
      this.transitionTo('player', collectionId);
    },

    /**
     * Action triggered to filter by type in collections page
     */
    filterType: function(term, collectionType) {
      var termParam = '?term=' + term;
      var collectionTypeParam = '&collectionType=' + collectionType;
      this.transitionTo('/search/collections' + termParam + collectionTypeParam);
    }
  }

});
