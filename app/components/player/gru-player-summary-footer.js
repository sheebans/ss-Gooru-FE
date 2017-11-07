import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  didRender() {
    let component = this;
    component.$('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-player-summary-footer'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action triggered for the next button
     */
    parentNext: function() {
      this.sendAction('parents');
    }
  }
});
