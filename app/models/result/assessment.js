import Ember from "ember";
import { average } from "gooru-web/utils/math";

/**
 * Model for a group of questions that were answered by a user during one attempt to complete an assessment.
 *
 * @typedef {Object} AssessmentResult
 *
 */
export default Ember.Object.extend({

  /**
   * @property {QuestionResultDetails[]} questionsResults
   */
  questionsResults: [],

  /**
   * TODO: TBD
   * @property {Object[]} mastery - An array of learning target objects
   * Each object should have the following properties:
   *
   * standard: DS.attr('string'),       // standard text
   * learningTarget: DS.attr('string'), // learning target text
   * relatedQuestions: DS.attr()        // array of question result ids; these correspond to the ids in questionsResults
   * suggestedResources: DS.attr()      // array of resource cards
   */
  mastery: [],

  /**
   * @property {number} selectedAttempt - Attempt to which the data in questionsResults correspond
   */
  selectedAttempt: 0,

  /**
   * @property {date} submittedOn - Date in which the attempt was submitted
   */
  submittedOn: null,

  /**
   * @property {string} title - Title of the assessment
   */
  title: '',

  /**
   * @property {number} totalAttempts - Number of attempts the user has made for this assessment
   */
  totalAttempts: 0,


  // -------------------------------------------------------------------------
  // Computed Properties

  /**
   * Average user reaction to the questions in the assessment
   * @prop {Number} averageReaction
   */
  averageReaction: Ember.computed('questionsResults.[]', function () {
    var reactions = this.get('questionsResults').map(function (questionResult) {
      return questionResult.reaction;
    });
    return Math.round(average(reactions));
  }),

  /**
   * Number of questions answered correctly in this attempt
   * @prop {Number}
   */
  correctAnswers: Ember.computed('questionsResults.[]', function () {
    var results = this.get('questionsResults');
    var correct = 0;

    if (results.length) {
      correct = results.map(function (questionResult) {
        return questionResult.correct ? 1 : 0;
      })
        .reduce(function (a, b) {
          return a + b;
        });
    }
    return correct;
  }),

  /**
   * Percentage of correct answers vs. the total number of questions
   * @prop {Number}
   */
  correctPercentage: Ember.computed('questionsResults.[]', function () {
    var totalQuestions = this.get('questionsResults').length;
    var percentage = 0;

    if (totalQuestions) {
      percentage = Math.round(this.get('correctAnswers') / totalQuestions * 100);
    }
    return percentage;
  }),

  /**
   * Total number of seconds spent completing the current attempt
   * @prop {Number}
   */
  totalTimeSpent: Ember.computed('questionsResults.[]', function () {
    var results = this.get('questionsResults');
    var time = 0;

    if (results.length) {
      time = results.map(function (questionResult) {
        return questionResult.timeSpent;
      })
        .reduce(function (a, b) {
          return a + b;
        });
    }
    return time;
  })

});
