import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-task-header'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Text to show on the header
   * @property {String} promptText
   */
  promptText: null
});
