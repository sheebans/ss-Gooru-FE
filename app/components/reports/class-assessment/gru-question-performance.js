import Ember from 'ember';
import { getQuestionUtil } from 'gooru-web/config/question';
import { stats, userAnswers } from 'gooru-web/utils/question-result';
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
   * @prop { ReportData } reportData - Representation of the data to show in the reports as a 3D matrix
   * Any changes on the content feed will cause the report data to update
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
   * Question results for this question, all students
   *
   * @property {QuestionResult[]}
   */
  questionResults: Ember.computed("question", "reportData.data", function(){
    const reportData = this.get("reportData");
    return reportData.getResultsByQuestion(this.get("question.id"));
  }),

  /**
   * Returns a convenient structure to display the x-bar-chart
   */
  questionBarChartData: Ember.computed("questionResults.[]", function(){
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
  answersData: Ember.computed("questionResults.[]", function(){
    const component = this;
    const question = component.get("question");
    const questionUtil = getQuestionUtil(question.get("questionType")).create({ question: question });

    const userAnswers = userAnswers(this.get("questionResults"));
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
  })
  // -------------------------------------------------------------------------
  // Methods

});
