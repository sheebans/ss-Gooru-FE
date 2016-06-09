import Ember from 'ember';
import {DEFAULT_PAGE_SIZE} from 'gooru-web/config/config';

/**
 * Resources search controller
 *
 * Controller responsible for filtering and searching resources
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({

  queryParams: ['selectedOptionTypes'],

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
    /**
     * Action triggered to selectMenuOption
     */
    selectMenuOption: function (option) {
      var controller = this;
      var searchService = controller.get('searchService');
      var selectedOptionTypes = controller.get('selectedOptionTypes');
      var term = controller.get('term');

      if(selectedOptionTypes.contains(option)){
        selectedOptionTypes.removeObject(option);
      }
      else {
        selectedOptionTypes.pushObject(option);
      }

      controller.resetPagination();

      const params = controller.getSearchParams();
      searchService.searchResources(term, params)
        .then(function(resourceResults){
          controller.set("resourceResults", resourceResults);
        });


    },

    showMoreResults: function(){
      this.showMoreResults();
    }

  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Types of question selected
   *  @property {array} selectedOptionTypes
   *
   */
  selectedOptionTypes: Ember.A([]),

  /**
   * These are the resource search results
   * @property {Resource[]}
   */
  resourceResults: null,

  /**
   * @property {string} term filter
   */
  term: Ember.computed.alias("searchController.term"),

  /**
   * @property {string[]} standards
   */
  taxonomies: Ember.computed.alias("searchController.taxonomies"),

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
  showMoreResultsButton: Ember.computed("resourceResults.[]", function(){
    return this.get("resourceResults.length") &&
      (this.get("resourceResults.length") % this.get("pagination.pageSize") === 0);
  }),

  // -------------------------------------------------------------------------
  // Methods

  showMoreResults: function(){
    const controller = this;
    const pagination = this.get("pagination");
    pagination.page = pagination.page + 1;

    const params = controller.getSearchParams();
    controller.get('searchService').searchResources(controller.get("term"), params)
      .then(function(questions){
        controller.get("resourceResults").pushObjects(questions.toArray());
      });
  },

  /**
   * Returns the current search params
   * @returns {{formats: (*|V), page: number, pageSize: *, taxonomies: (*|V)}}
   */
  getSearchParams: function(){
    const controller = this;
    const pagination = controller.get("pagination");
    return {
      formats: controller.get("selectedOptionTypes"),
      page: pagination.page,
      pageSize: pagination.pageSize,
      taxonomies: controller.get("taxonomies")
    };
  },

  resetValues: function(){
    this.resetPagination();
  },

  /**
   * Resets the pagination values
   */
  resetPagination: function () {
    this.set("pagination", {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    });
  },
  setInvalidSearchTerm : function(value){
    this.get('appController').setInvalidSearchTerm(value);
  }


});
