import Ember from 'ember';

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
   * @property {Content/Question[]}
   */
  questionResults: null,

  /**
   * @property {string} term filter
   */
  term: Ember.computed.alias("searchController.term")

  // -------------------------------------------------------------------------
  // Methods

});
