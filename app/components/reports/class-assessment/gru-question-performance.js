import Ember from 'ember';
import { getQuestionUtil } from 'gooru-web/config/question';
import { stats, completedResults, sortResults } from 'gooru-web/utils/question-result';
import { GRADING_SCALE } from 'gooru-web/config/config';

/**
 * Question Performance Component
 *
 * Component responsible for displaying the question performance information for several students
 *
 * @module
 * @augments Ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-question-performance'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {User[]} students
   */
  students: null,

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
   * @property {Resource} question
   */
  question: null,

  /**
   * Indicates if the report is displayed in anonymous mode
   * @property {boolean} anonymous
   */
  anonymous: null,

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
  studentsResults: Ember.computed("question", "reportData", "students.[]", function(){
    const reportData = this.get("reportData");
    const students = this.get("students");
    const questionId = this.get("question.id");
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
   * @property {QuestionResult[]} question results
   */
  questionResults: Ember.computed("studentsResults.[]", function(){
    return this.get("studentsResults").map(function(studentResult){
      return studentResult.get("questionResult");
    });
  }),

  /**
   * Returns a convenient structure to display the x-bar-chart
   */
  questionBarChartData: Ember.computed("studentsResults.[]", function(){
    const questionResults = this.get("questionResults");

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
  }),

  /**
   * Convenience structure to display the answers distribution
   * @property {*} answer distributions
   */
  answersData: Ember.computed("studentsResults.[]", function(){
    const component = this;
    const question = component.get("question");
    const questionUtil = getQuestionUtil(question.get("questionType")).create({ question: question });

    const userAnswers = component.get("userAnswers");
    const distribution = questionUtil.distribution(userAnswers);

    const answersData = Ember.A([]);
    distribution.forEach(function(answerDistribution){
      let userAnswer = answerDistribution.get("answer");
      answersData.addObject(Ember.Object.create({
        correct: questionUtil.isCorrect(userAnswer),
        userAnswer: userAnswer,
        percentage: answerDistribution ? answerDistribution.get("percentage") : 0,
        students: Ember.A([])
      }));
    });

    return answersData;
  }),

  /**
   * Returns valid user answers
   * @return {*} user answers
   */
  userAnswers: Ember.computed("questionResults.[]", function(){
    let completed = completedResults(this.get("questionResults"));
    let sorted = sortResults(completed);
    return sorted.map(function(questionResult){
      return questionResult.get("userAnswer");
    });
  })

  // -------------------------------------------------------------------------
  // Methods

});
