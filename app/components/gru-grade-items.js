import Ember from 'ember';

/**
 * Grade Items component
 *
 * Component responsible to show questions pending grading in the teacher class performance tab
 * This component can be reused across the entire application and can be styled as needed,
 * functionality should remain the same
 *
 * @module
 * @augments Ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-grade-items'],

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties
  /**
   * The grade items
   * @property {GradeQuestionItem[]} items
   */
  items: Ember.A()

  // -------------------------------------------------------------------------
  // Observers

  // -------------------------------------------------------------------------
  // Methods
});
