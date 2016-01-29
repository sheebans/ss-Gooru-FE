import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'gru-questions-xs'],
  // -------------------------------------------------------------------------
  // Properties

  /**
   * Question to be displayed by the component
   *
   * @property {Ember.Object}
   */
  question: null,

});
