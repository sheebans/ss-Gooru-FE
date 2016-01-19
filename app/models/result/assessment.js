import DS from "ember-data";

/**
 * Model for the completion of an assessment by a user.
 * This model tracks the different attempts made by a user to complete an assessment.
 *
 * @typedef {Object} AssessmentResult
 *
 */
export default DS.Model.extend({

  /**
   * @property {number[]} attempts - Array of IDs of each one of the attempts made by a user for this assessment
   */
  attempts: DS.attr(),

  /**
   * @property {number} user - ID of the user looking to complete the assessment
   */
  user: DS.attr('number'),

  /**
   * @property {string} title - Title of the assessment
   */
  title: DS.attr('string')

});

