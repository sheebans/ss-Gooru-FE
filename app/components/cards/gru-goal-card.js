import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['cards gru-goal-card'],

  classNameBindings: ['expanded:expanded:collapsed'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    toggle: function() {
      this.set("expanded", !this.get("expanded"));
    }

  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Goal} goal information
   */
  goal: null,

  /**
   * @property {boolean}
   */
  expanded: false
});
