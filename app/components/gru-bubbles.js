import Ember from 'ember';
/**
 * Bubble component
 *
 * Component responsible for show  the question bubbles under the assessment report
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
// -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-bubbles'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Select a option in the bubble list
     * @function actions:selectBubbleOption
     * @param {Ember.Object} option
     */
    selectBubbleOption: function(option) {
      this.sendAction("onbubbleOptionSelect", option);
    }

  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * List of options to show in bubbles
   *
   * @property {Array}
   */
    bubbleOptions: null,
});
