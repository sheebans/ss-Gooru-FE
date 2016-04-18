import Ember from 'ember';

/**
 * Serializer to support the Assessment CRUD operations for API 3.0
 *
 * @typedef {Object} AssessmentSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Assessment object into a JSON representation required by the Create Assessment endpoint
   *
   * @param assessmentModel The Assessment model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateAssessment: function(assessmentModel) {
    return this.serializeAssessment(assessmentModel);
  },

  /**
   * Serialize an Assessment object into a JSON representation required by the Update Assessment endpoint
   *
   * @param assessmentModel The Assessment model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateAssessment: function(assessmentModel) {
    return this.serializeAssessment(assessmentModel);
  },

  serializeAssessment: function(assessmentModel) {
    return {
      title: assessmentModel.get('title'),
      learning_objective: assessmentModel.get("learningObjectives")
    };
  }


});

