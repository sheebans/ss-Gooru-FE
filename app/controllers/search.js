import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  queryParams: ['term', "collectionType"],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered to filter by type in collections page
     */
    filterType: function (term, collectionType) {
      //TODO: create a search criteria object instead of passing that many parameters
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
