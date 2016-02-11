import Ember from 'ember';
import { getQuestionUtil } from 'gooru-web/config/question';
import { stats, answeredResults, sortResults } from 'gooru-web/utils/question-result';
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
   * Indicates when the report is display in anonymous mode if show all performance results
   * @property {boolean} showResult
   */
  showResult: null,

/**
 * Indicates if is anonymous and show the performance Results
 * @property {boolean} anonymousAndShowResult
 */

  anonymousAndShowResult : Ember.computed.and('anonymous','showResult'),

  /**
   * Indicates if is anonymous and show the performance Results
   * @property {boolean} anonymousAndShowResult
   */
  anonymousAndHideResult : Ember.computed('anonymous','showResult',function(){
    return this.get('anonymous')===true&& this.get('showResult')=== false ? true: false ;
  }),

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
  studentsResults: Ember.computed("question", "reportData.data", "students.[]", function(){
    const reportData = this.get("reportData.data");
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
    const correctColor = GRADING_SCALE[GRADING_SCALE.length - 1].COLOR;
    const failColor = GRADING_SCALE[0].COLOR;

    distribution.forEach(function(answerDistribution){
      let userAnswer = answerDistribution.get("answer");
      answersData.addObject(Ember.Object.create({
        correct: questionUtil.isCorrect(userAnswer),
        userAnswer: userAnswer,
        percentage: answerDistribution ? answerDistribution.get("percentage") : 0,
        students: Ember.A([]),
        charData: Ember.A([Ember.Object.create({
          color: questionUtil.isCorrect(userAnswer) ? correctColor :failColor,
          percentage:answerDistribution ? answerDistribution.get("percentage") : 0,
        })])
      }));
    });

    return answersData;
  }),

  /**
   * Returns valid user answers
   * @return {*} user answers
   */
  userAnswers: Ember.computed("questionResults.[]", function(){
    let answered = answeredResults(this.get("questionResults"));
    let sorted = sortResults(answered); //sort results by submitted at
    return sorted.map(function(questionResult){
      return questionResult.get("userAnswer");
    });
  })

  // -------------------------------------------------------------------------
  // Methods

});
