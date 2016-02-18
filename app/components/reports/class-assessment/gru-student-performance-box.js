import Ember from 'ember';
import { correctPercentage, totalCompleted } from 'gooru-web/utils/question-result';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-student-performance-box'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * When the user clicks at the box
     */
    click: function(){
      const component = this;
      component.get('onClick')(component.get("student"));
      Ember.Logger.debug('Clicking at student: ' + component.get("student.id"));
    },
    /**
     * @function actions:selectQuestion
     * @param {Number} questionId
     */
    selectQuestion: function (questionId) {
      this.get('onSelectQuestion')(questionId);
    },
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {User} student
   */
  student: null,

  /**
   * Array containing the QuestionResult or empty object based on the student responses
   * empty object for not started questions
   * @property {QuestionResult[]} reportData
   */
  reportData: null,

  /**
   * Indicates if the report is displayed in anonymous mode
   * @property {boolean} anonymous
   */
  anonymous: false,


  /**
   * Actual student question results, it excludes non started questions
   * @property {QuestionResult[]} questionResults
   */
  questionResults: Ember.computed("reportData.[]", function(){
    const reportData = this.get("reportData") || [];
    return Ember.A(reportData).filter(function(item){
      return item.get("started"); //only started question results
    });
  }),

  /**
   * It returns an object representing the status for each question
   * @property {[]} questions
   */
  questions: Ember.computed("reportData.[]", function(){
    let component = this;
    let reportData = component.get("reportData");
    return reportData.map(function(item){
      return component.getQuestionStatus(item);
    });
  }),

  /**
   * @property {number} user assessment score
   */
  score: Ember.computed("questionResults.[]", function(){
    return correctPercentage(this.get('questionResults'));
  }),

  /**
   * Indicates if the assessment has been started
   * @property {number} notStarted
   */
  started: Ember.computed("questionResults.[]", function(){
    return totalCompleted(this.get('questionResults'));
  }),
  /**
   * @property {Function} onSelectQuestion - Event handler called when a question in a column is selected
   */
  onSelectQuestion: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Gets the question status
   * @param {QuestionResult} questionResult
   */
  getQuestionStatus: function(questionResult){
    let status = 'not-started';
    let questionId;
    if (questionResult.get("started")) { //if it has been started
      let correct = questionResult.get("correct");
      status = (correct ? 'correct' : 'incorrect'); //skipped is displayed as incorrect
      questionId = questionResult.get('questionId');
    }
    return Ember.Object.create({
      status: status,
      id:questionId
    });
  }


});
