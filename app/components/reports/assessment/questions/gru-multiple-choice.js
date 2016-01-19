import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'assessment', 'questions','gru-multiple-choice'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Question information
   * @property {Question} question
   */
  question: null,

});
