import Ember from 'ember';
import { getGradeColor } from 'gooru-web/utils/utils';
import { GRADING_SCALE } from 'gooru-web/config/config';
import { average } from 'gooru-web/utils/math';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['reports', 'class-assessment', 'gru-summary'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop { Object[] } answersData - Array that keeps track of all the correct and incorrect answers
   * for each student taking an assessment
   *
   * Each object will consist of:
   * - correct: number of questions that the student has answered correctly
   * - incorrect: number of questions that the student has answered incorrectly
   */
  answersData: Ember.computed('rawData', function () {
    const studentsIds = this.get('studentsIds');
    const questionsIds = this.get('assessmentQuestionsIds');

    var rawData = this.get('rawData');
    var answers = [];

    studentsIds.forEach(function (student) {
      var answerCounter = {
        correct: 0,
        incorrect: 0
      };
      answers.push(answerCounter);

      questionsIds.forEach(function (question) {
        var isCorrect = rawData[student][question]['correct'];

        if (isCorrect) {
          answerCounter.correct++;
        } else {
          // Any value different than 'false' (i.e. null or undefined) will be ignored
          if (isCorrect === false) {
            answerCounter.incorrect++;
          }
        }
      });
    });

    return answers;
  }),

  /**
   * @prop { Collection } assessment
   */
  assessment: null,

  /**
   * @prop { String[] } assessmentQuestionsIds - An array with the ids of all the questions in the assessment
   */
  assessmentQuestionsIds: Ember.computed('assessment.resources.[]', function () {

    return this.get('assessment.resources').map(function (question) {
      return question.id;
    });
  }),

  /**
   * @prop { number } averageScore - average score in the assessment (per scoresData)
   */
  averageScore: Ember.computed('scoresData', function () {
    return Math.round(average(this.get('scoresData')));
  }),

  /**
   * @prop { Object[] } classScores - Aggregate data of the scores in the assessment
   * (to be consumed by the pie chart component)
   *
   * Each object will consist of:
   * - color: color corresponding to a grade bracket in the grading scale (@see /app/config/config.js)
   * - value: percentage of students in the class with a score within said grade bracket
   */
  classScores: Ember.computed('scoresData', function () {
    const scoresData = this.get('scoresData');

    const scoresColors = scoresData.map(function (score) {
      // Map a score to its color
      return getGradeColor(score);
    });

    const colors = GRADING_SCALE.map(function (item) {
      return item.COLOR;
    });

    var results = [];

    if (scoresColors.length) {
      let scoreColorsLen = scoresColors.length;

      colors.forEach(function (color) {
        // Count the number of appearances of a certain color
        var numColor = scoresColors.filter(function (scoreColor) {
          return scoreColor === color;
        }).length;

        if (numColor) {
          results.push({
            color: color,
            value: Math.round(numColor / scoreColorsLen * 100)
          })
        }
      });
    }

    return results;
  }),

  /**
   * @prop { Object[] } questionsData - Aggregate data of the completion of each question in the assessment
   *
   * Each object corresponds to a question and will consist of:
   * - status: status related to the completion of the question (i.e. 'correct', 'incorrect', 'pending')
   * - percentage: percentage of students in the class that have achieved said status
   */
  questionsData: null,

  /**
   * @prop { Numer[] } scoresData - Array with all the scores in the assessment
   */
  scoresData: Ember.computed('answersData', function () {
    const answersData = this.get('answersData');

    var answerIdx = answersData.length - 1;
    var results = [];

    for (; answerIdx >= 0; answerIdx--) {
      let correct = answersData[answerIdx].correct;
      let totalAnswered = correct + answersData[answerIdx].incorrect;

      if (totalAnswered > 0) {
        let score = Math.round(correct / totalAnswered * 100);
        results.push(score);
      }
    }

    return results;
  }),

  /**
   * @prop { User[] } students - Students taking the assessment
   */
  students: null,

  /**
   * @prop { String[] } studentsIds - An array with the ids of all the students taking the assessment
   */
  studentsIds: Ember.computed('students.[]', function () {
    return this.get('students').map(function (student) {
      return student.id;
    });
  }),

  /**
   * @prop { Object{}{}{} } rawData - Unordered 3D matrix of student data with regards to the questions
   */
  rawData: null

});
