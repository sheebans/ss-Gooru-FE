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
    },

    delete: function() {
      if (this.get("onDelete")) {
        this.sendAction("onDelete", this.get("goal"));
      }
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
  expanded: false,

  /**
   * @property {string} name of the delete action
   */
  onDelete: null
});
