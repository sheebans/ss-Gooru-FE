import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['grading', 'gru-rubric-off'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {},

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Rubric to grade
   * @property {Rubric} rubric
   */
  rubric: null
});
