import Ember from 'ember';

/**
 * Questions summary component
 *
 * Component responsible for laying out the question details for the class assessment report
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
// -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-questions-detail'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Collection} assessment
   */
  assessment: null,

  /**
   * @prop { Object{}{}{} } reportData - Representation of the data to show in the reports as a 3D matrix
   * Any changes on the content feed will cause the report data to update
   *
   * @see gooru-web/components/reports/class-assessment/gru-class-assessment-report.js
   *
   * Sample structure
   *
   * The "questionId#" corresponds to the actual question id
   *  {
   *    user1 {
   *      questionId1 : QuestionResult,
   *      questionId2 : QuestionResult,
   *      questionId3 : QuestionResult
   *     },
   *    user2 {
   *      questionId1 : QuestionResult,
   *      questionId2 : QuestionResult,
   *      questionId3 : QuestionResult
   *    }
   *  }
   */
  reportData: null,

  /**
   * Indicates if the report is displayed in anonymous mode
   * @property {boolean} anonymous
   */
  anonymous: false,

  /**
   * @prop { User[] } students - Group of students taking an assessment
   */
  students: null




  // -------------------------------------------------------------------------
  // Methods

});
