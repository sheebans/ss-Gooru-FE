import Ember from 'ember';
/**
 * Switch component
 *
 * Component responsible for show two options to switch
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-switch'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Select a option
     * @function actions:selectOption
     * @param {Ember.Object} option
     */
    selectOption: function (option) {
      this.sendAction("onOptionChange", option);
    }

  },
// -------------------------------------------------------------------------
// Properties
  /**
   * List of options to show in the switch
   *
   * @property {Array}
   */
  switchOptions: null,
});


