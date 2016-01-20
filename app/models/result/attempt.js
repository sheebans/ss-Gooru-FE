// import DS from "ember-data";
import Ember from "ember";
import { average } from "gooru-web/utils/math";

/**
 * Model for an attempt made by a user to complete an assessment.
 *
 * @typedef {Object} AttemptResult
 *
 */

// TODO: Extend from DS.Model
export default Ember.Object.extend({  // DS.Model.extend({

  /**
   * @property {number} assessmentResult - ID of the assessment result that this attempt belongs to
   */
  assessmentResult: null,   // DS.attr('number'),

  /**
   * @property {Object[]} mastery - An array of learning target objects
   * Each object should have the following properties:
   *
   * standard: DS.attr('string'),       // standard text
   * learningTarget: DS.attr('string'), // learning target text
   * relatedQuestions: DS.attr()        // array of question result ids; these correspond to the ids in questionResults
   * suggestedResources: DS.attr()      // array of resource cards
   */
  mastery: [],              // DS.attr(),

  /**
   * @property {QuestionResult[]} questionResults - An array of question result objects
   * @see models/results/question.js
   */
  questionResults: [],      // DS.attr(),

  /**
   * @property {date} submittedOn - Date this attempt was submitted
   */
  submittedOn: null,        // DS.attr("date"),

  /**
   * @property {number} user - ID of the author that committed this attempt
   */
  user: null,                // DS.attr('number')

  // COMPUTED PROPERTIES
  /**
   * Average user reaction to the questions in the assessment
   * @prop {Number} averageReaction
   */
  averageReaction: Ember.computed('questionResults.[]', function () {
    var reactions = this.get('questionResults').map(function (questionResult) {
      return questionResult.reaction;
    });
    return Math.round(average(reactions));
  }),

  /**
   * Number of questions answered correctly in this attempt
   * @prop {Number}
   */
  correctAnswers: Ember.computed('questionResults.[]', function () {
    var results = this.get('questionResults');
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
  correctPercentage: Ember.computed('questionResults.[]', function () {
    var totalQuestions = this.get('questionResults').length;
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
  totalTimeSpent: Ember.computed('questionResults.[]', function () {
    var results = this.get('questionResults');
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

