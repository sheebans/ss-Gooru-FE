import Ember from "ember";

import { averageReaction,correctAnswers,correctPercentage,totalTimeSpent } from 'gooru-web/utils/question-result';

/**
 * Model for a group of questions that were answered by a user during one attempt to complete an assessment.
 *
 * @typedef {Object} AssessmentResult
 *
 */
export default Ember.Object.extend({

  /**
   * @property {QuestionResult[]} questionsResults
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
  averageReaction: Ember.computed('questionsResults.[]',function(){
      return averageReaction(this.get('questionsResults'));
  }),

  /**
   * Number of questions answered correctly in this attempt
   * @prop {Number}
   */
  correctAnswers:Ember.computed('questionsResults.[]',function(){
    return correctAnswers(this.get('questionsResults'));
  }),


  /**
   * Percentage of correct answers vs. the total number of questions
   * @prop {Number}
   */
  correctPercentage:Ember.computed('questionsResults.[]','correctAnswers.[]',function(){
    return correctPercentage(this.get('questionsResults'), this.get('correctAnswers'));
  }),

  /**
   * Total number of seconds spent completing the current attempt
   * @prop {Number}
   */
  totalTimeSpent:Ember.computed('questionsResults.[]',function(){
    return totalTimeSpent(this.get('questionsResults'));
  }),

});
