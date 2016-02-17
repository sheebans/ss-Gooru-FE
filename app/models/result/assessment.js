import Ember from "ember";
import QuestionResult from './question';
import ResourceResult from './resource';

import { averageReaction, correctPercentage, totalTimeSpent, correctAnswers } from 'gooru-web/utils/question-result';

/**
 * Model for a group of questions that were answered by a user during one attempt to complete an assessment.
 *
 * @typedef {Object} AssessmentResult
 *
 */
export default Ember.Object.extend({


  //
  // Properties
  /**
   * @property {ResourceResult[]} resourceResults
   */
  resourceResults: Ember.A([]),

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
  }),

  //
  // Methods
  /**
   * Initializes the assessment results
   * @param {Collection} collection
   */
  initAssessmentResult: function(collection){
    const resourceResults = this.get("resourceResults");
    const resources = collection.get("resources");
    resources.forEach(function(resource){
      let resourceId = resource.get('id');
      let found = resourceResults.filterBy("resourceId", resourceId).get("length");
      if (!found){
        let result = (resource.get("isQuestion")) ?
          QuestionResult.create({ resourceId: resourceId, resource: resource }) :
          ResourceResult.create({ resourceId: resourceId, resource: resource });
        resourceResults.addObject(result);
      }
    });
  },

  /**
   * Gets the result by resource id
   * @param {string} resourceId
   * @returns {ResourceResult}
   */
  getResultByResourceId: function(resourceId){
    return this.get("resourceResults").findBy("resourceId", resourceId);
  }




});
