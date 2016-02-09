import Ember from 'ember';
import { GRADING_SCALE } from 'gooru-web/config/config';
import { stats } from 'gooru-web/utils/question-result';

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
  selectedQuestion: null,

  /**
   * A convenient structure to display the selected question results
   *
   * Sample
   *  [
   *    {
   *      student: {User},
   *      questionResult: {QuestionResult}
   *    },
   *    {
   *      student: {User},
   *      questionResult: {QuestionResult}
   *    },
   *    ...
   *  ]
   *
   * @property {Array}
   */
  selectedQuestionResults: Ember.computed("selectedQuestion.id", "reportData", "students.[]", function(){
    const reportData = this.get("reportData");
    const students = this.get("students");
    const questionId = this.get("selectedQuestion.id");
    let questionResults = Ember.A([]);
    students.forEach(function(student){
      const userQuestionResults = reportData[student.get("id")];
      if (userQuestionResults){ //adding student question result for the selected question if available
        const questionResult = userQuestionResults[questionId];
        if (questionResult){
          questionResults.addObject(Ember.Object.create({
            student: student,
            questionResult: questionResult //at this point could be a QuestionResult or {} when not-started
          }));
        }
      }
    });
    return questionResults;
  }),

  /**
   * Returns a convenient structure to display the x-bar-chart
   */
  selectedQuestionBarChartData: Ember.computed("selectedQuestionResults.[]", function(){
    const questionResults = this.get("selectedQuestionResults").map(function(item){
      return item.get("questionResult");
    });

    const totals = stats(questionResults);
    const total = totals.get("total");

    const correctColor = GRADING_SCALE[GRADING_SCALE.length - 1].COLOR;
    const failColor = GRADING_SCALE[0].COLOR;
    return Ember.Object.create({
      data: [
        {
          color: failColor,
          percentage: totals.get("incorrectPercentage")
        },
        {
          color: correctColor,
          percentage: totals.get("correctPercentage")
        }
      ],
      completed: totals.get("totalCompleted"),
      total: total
    });
  })




  // -------------------------------------------------------------------------
  // Methods

});
