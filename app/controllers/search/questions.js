import Ember from 'ember';
import {DEFAULT_PAGE_SIZE} from 'gooru-web/config/config';

/**
 * Questions search controller
 *
 * Controller responsible for filtering and searching questions
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({

  queryParams: ['selectedOptionTypes'],
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
      searchService.searchQuestions(term, selectedOptionTypes)
        .then(function(questionResults){
          controller.set("questionResults", questionResults);
        });

      this.set('selectedOptionTypes', selectedOptionTypes);
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
   * These are the question search results
   * @property {Question[]}
   */
  questionResults: null,

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
  showMoreResultsButton: Ember.computed("questionResults.[]", function(){
    return this.get("questionResults.length") &&
      (this.get("questionResults.length") % this.get("pagination.pageSize") === 0);
  }),

  // -------------------------------------------------------------------------
  // Methods

  showMoreResults: function(){
    const controller = this;
    const pagination = this.get("pagination");
    pagination.page = pagination.page + 1;

    this.get('searchService').searchQuestions(controller.get("term"), controller.get("selectedOptionTypes"), pagination)
      .then(function(questions){
        controller.get("questionResults").pushObjects(questions.toArray());
      });
  },

  resetValues: function(){
    this.set("pagination", {
      page: 0,
      pageSize: DEFAULT_PAGE_SIZE
    })
  }


});
