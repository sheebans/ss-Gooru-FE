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

  // -------------------------------------------------------------------------
  // Methods

});