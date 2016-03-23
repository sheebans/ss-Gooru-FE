import Ember from 'ember';

/**
 * Resources search controller
 *
 * Controller responsible for filtering and searching resources
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  searchController: Ember.inject.controller('search'),

  // -------------------------------------------------------------------------
  // Attributes

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered to selectMenuOption
     */
    selectMenuOption: function (option) {
      var selectedOptionTypes = this.get('selectedOptionTypes');
      var controller = this;
      var searchService = controller.get('searchService');
      var term = controller.get('term');

      if(selectedOptionTypes.contains(option)){
        selectedOptionTypes.removeObject(option);
      }
      else {
        selectedOptionTypes.pushObject(option);
      }

      searchService.searchResources(term, selectedOptionTypes)
        .then(function(resourceResults){
          controller.set("resourceResults", resourceResults);
        });

      this.set('selectedOptionTypes', selectedOptionTypes);
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
   * Types of question selected
   *  @property {array} selectedOptionTypes
   *
   */
  selectedOptionTypes: Ember.A([]),

  /**
   * These are the resource search results
   * @property {resourceResults[]}
   */
  resourceResults: null,

  /**
   * @property {string} term filter
   */
  term: null

  // -------------------------------------------------------------------------
  // Methods

});
