import Ember from 'ember';
import {DEFAULT_PAGE_SIZE} from 'gooru-web/config/config';

/**
 * Assessments Controller
 *
 * @module
 * @augments ember/CollectionsController
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  searchController: Ember.inject.controller('search'),
  appController: Ember.inject.controller('application'),
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
   * These are the assessment search results
   * @property {Assessment[]}
   */
  assessmentResults: null,

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
  showMoreResultsButton: Ember.computed("assessmentResults.[]", function(){
    return this.get("assessmentResults.length") &&
      (this.get("assessmentResults.length") % this.get("pagination.pageSize") === 0);
  }),

  // -------------------------------------------------------------------------
  // Methods

  showMoreResults: function(){
    const controller = this;
    const pagination = this.get("pagination");
    pagination.page = pagination.page + 1;

    this.get('searchService').searchAssessments(controller.get("term"), pagination)
      .then(function(assessments){
        controller.get("assessmentResults").pushObjects(assessments.toArray());
      });
  },

  resetValues: function(){
    this.set("pagination", {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    })
  },
  setInvalidSearchTerm : function(value){
    this.get('appController').setInvalidSearchTerm(value);
  }

});
