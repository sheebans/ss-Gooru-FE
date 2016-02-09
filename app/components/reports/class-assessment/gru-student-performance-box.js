import Ember from 'ember';
import { correctPercentage, correctAnswers } from 'gooru-web/utils/question-result';

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
      return !Ember.$.isEmptyObject(item); // it doesn't return empty objects
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
    return correctPercentage(this.get('questionResults'), this.get('correctAnswers'));
  }),

  /**
   * Number of questions answered correctly in this attempt
   * @prop {Number}
   */
  correctAnswers:Ember.computed('questionResults.[]',function(){
    return correctAnswers(this.get('questionResults'));
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
    if (!Ember.$.isEmptyObject(questionResult)){ //if available and non empty object
      let skipped = questionResult.get("correct") === null;
      let correct = questionResult.get("correct");
      status = skipped ? 'skipped' : (correct ? 'correct' : 'incorrect');
      questionId = questionResult.get('questionId');
    }
    return Ember.Object.create({
      status: status,
      id:questionId
    });
  },


});
