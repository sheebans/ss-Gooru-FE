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

      if(selectedOptionTypes.contains(option)){
        selectedOptionTypes.removeObject(option);
      }
      else {
        selectedOptionTypes.pushObject(option);
      }

      this.set('selectedOptionTypes', selectedOptionTypes);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Services

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
  resourceResults: null

  // -------------------------------------------------------------------------
  // Methods

});
