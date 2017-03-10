import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content','rubric','gru-fixed-footer'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {[]} actions List of action buttons to show in the footer
   */
  footerActions: []

});