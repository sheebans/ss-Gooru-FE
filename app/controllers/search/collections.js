import Ember from 'ember';
import {DEFAULT_PAGE_SIZE} from 'gooru-web/config/config';

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
  searchController: Ember.inject.controller('search'),

  /**
   * @property {Ember.Service} Service to do the search
   */
  searchService: Ember.inject.service('api-sdk/search'),
  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    showMoreResults: function(){
      this.showMoreResults();
    }
  },
  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Services

  // -------------------------------------------------------------------------
  // Properties
  /**
   * These are the collection search results
   * @property {CollectionResult[]}
   */
  collectionResults: null,

  /**
   * @property {string} term filter
   */
  term: Ember.computed.alias("searchController.term"),

  /**
   * @property {*}
   */
  pagination: {
    page: 0,
    pageSize: DEFAULT_PAGE_SIZE
  },

  /**
   * @property {boolean}
   */
  showMoreResultsButton: Ember.computed("collectionResults.[]", function(){
    return this.get("collectionResults.length") &&
      (this.get("collectionResults.length") % this.get("pagination.pageSize") === 0);
  }),

  // -------------------------------------------------------------------------
  // Methods

  showMoreResults: function(){
    const controller = this;
    const pagination = this.get("pagination");
    pagination.page = pagination.page + 1;

    this.get('searchService').searchCollections(controller.get("term"), pagination)
      .then(function(collections){
        controller.get("collectionResults").pushObjects(collections.toArray());
      });
  },

  resetValues: function(){
    this.set("pagination", {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    })
  }

});
