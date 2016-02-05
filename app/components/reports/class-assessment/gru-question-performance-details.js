import Ember from 'ember';
/**
* Question Performance Detail component
*
* Component responsible for show a modal with the question performance details
*
* @module
* @augments ember/Component
*/
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-question-performance-detail'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Question to be displayed by the component
   *
   * @property {Result.QuestionDetail}
   */
    question: null,
});
