import DS from "ember-data";

/**
 * Model for an attempt made by a user to complete an assessment.
 *
 * @typedef {Object} AttemptResult
 *
 */
export default DS.Model.extend({

  /**
   * @property {number} assessmentResult - ID of the assessment result that this attempt belongs to
   */
  assessmentResult: DS.attr('number'),

  /**
   * @property {Object[]} mastery - An array of learning target objects
   * Each object should have the following properties:
   *
   * standard: DS.attr('string'),       // standard text
   * learningTarget: DS.attr('string'), // learning target text
   * relatedQuestions: DS.attr()        // array of question result ids; these correspond to the ids in questionResults
   * suggestedResources: DS.attr()      // array of resource cards
   */
  mastery: DS.attr(),

  /**
   * @property {QuestionResult[]} questionResults - An array of question result objects
   * @see models/results/question.js
   */
  questionResults: DS.attr(),

  /**
   * @property {date} submittedOn - Date this attempt was submitted
   */
  submittedOn: DS.attr("date"),

  /**
   * @property {number} user - ID of the author that committed this attempt
   */
  user: DS.attr('number')

});

