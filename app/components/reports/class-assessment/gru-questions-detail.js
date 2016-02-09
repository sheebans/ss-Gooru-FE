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
  actions:{
    /**
     * When clicking at any navigation bubble
     * @param bubbleOption
     */
    bubbleSelect: function(bubbleOption){
      this.set("selectedQuestion", bubbleOption.get("value"));
    }
  },

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
  students: null,

  /**
   * Returns a convenience structure to display the question navigation bubbles
   * @returns {Array}
   */
  questionsNavOptions: Ember.computed("assessment.resources.[]", function () {
    let questions = this.get("assessment.resources");
    let selectedQuestion = this.get("selectedQuestion");
    return questions.map(function (question) {
      return Ember.Object.create({
        label: question.get('order'),
        status: null, //no status needed
        value: question,
        selected: (selectedQuestion && selectedQuestion.get("id") === question.get("id"))
      });
    });
  }),

  /**
   * @property {Resource} selected question
   */
  selectedQuestion: null


  // -------------------------------------------------------------------------
  // Methods

});
