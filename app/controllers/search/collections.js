import Ember from 'ember';

/**
 * Collection search controller
 *
 * Controller responsible for filtering and searching collections/assessments
 *
 * @module
 * @see controllers/player.js
 * @augments ember/Controller
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  queryParams: ['term', "collectionType", "gradeIds", "subjectIds"],

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered to filter by type in collections page
     */
    filterType: function (term, collectionType) {
      const
        controller = this,
        searchService = controller.get('searchService'),
        params = {
          "term": term,
          "collectionType": collectionType
        };

      searchService.searchCollections(params).then(function(collectionResults){
        controller.setProperties(params);
        controller.set("collectionResults", collectionResults);
      });
    }

  },


  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Services
  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {string} term filter
   */
  term: null,

  /**
   * @property {string} collection type filter
   */
  collectionType: null,

  /**
   * @property {string} subject ids filter
   */
  subjectIds: null,

  /**
   * @property {string} grade ids filter
   */
  gradeIds: null,

  /**
   * Configured subjects
   * @property {Subject[]}
   */
  subjects: null,

  /**
   * Configured grades
   * @property {Grade[]}
   */
  grades: null,

  /**
   * Configured standards
   * @property {Standard[]}
   */
  standards: null,

  /**
   * These are the collection search results
   * @property {CollectionResult[]}
   */
  collectionResults: null



  // -------------------------------------------------------------------------
  // Methods

});
