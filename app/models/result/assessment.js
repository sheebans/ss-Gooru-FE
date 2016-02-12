import Ember from "ember";

import { averageReaction, correctPercentage, totalTimeSpent, correctAnswers } from 'gooru-web/utils/question-result';

/**
 * Model for a group of questions that were answered by a user during one attempt to complete an assessment.
 *
 * @typedef {Object} AssessmentResult
 *
 */
export default Ember.Object.extend({

  /**
   * @property {ResourceResult[]} resourceResults
   */
  resourceResults: [],

  /**
   * @property {QuestionResult[]} questionsResults
   */
  questionsResults: Ember.computed.alias("resourceResults"),

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

  /**
   * @property {number}
   */
  totalResources: Ember.computed.alias("resourceResults.length"),


  // -------------------------------------------------------------------------
  // Computed Properties

  /**
   * Average user reaction to the questions in the assessment
   * @prop {number} averageReaction
   */
  averageReaction: Ember.computed('questionsResults.[]',function(){
      return averageReaction(this.get('questionsResults'));
  }),

  /**
   * Percentage of correct answers vs. the total number of questions
   * @prop {number}
   */
  correctPercentage:Ember.computed('questionsResults.[]',function(){
    return correctPercentage(this.get('questionsResults'));
  }),

  /**
   * Total number of seconds spent completing the current attempt
   * @prop {number}
   */
  totalTimeSpent:Ember.computed('questionsResults.[]',function(){
    return totalTimeSpent(this.get('questionsResults'));
  }),

  /**
   * Total correct answers
   * @prop {number}
   */
  correctAnswers:Ember.computed('questionsResults.[]',function(){
    return correctAnswers(this.get('questionsResults'));
  })

});
