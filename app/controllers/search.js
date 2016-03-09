import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['term', "filterType"],

  // -------------------------------------------------------------------------
  // Actions

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
   * @property {string} filter type filter
   */
  filterType: null,

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
