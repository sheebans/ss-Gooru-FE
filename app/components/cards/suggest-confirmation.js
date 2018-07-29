import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['cards', 'suggest-confirmation'],

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * collection object
   * @type {Object}
   */
  collection: null,

  /**
   * Students list for suggestion
   * @type {Array}
   */
  students: Ember.A([]),

  /**
   * Maintains collection type
   * @type {String}
   */
  contentType: null,

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Trigger when cancel suggest  popup
     */
    onCancelSuggest() {
      this.sendAction('onCancelSuggest');
    },

    /**
     * Trigger when confirm suggest co popup
     */
    onConfirmSuggest() {
      this.sendAction('onConfirmSuggest');
    }
  }
});
