import Ember from 'ember';
import AssessmentModel from 'gooru-web/models/content/assessment';
import QuestionSerializer from 'gooru-web/serializers/content/question';

/**
 * Serializer to support the Assessment CRUD operations for API 3.0
 *
 * @typedef {Object} AssessmentSerializer
 */
export default Ember.Object.extend({

  /**
   * @property {QuestionSerializer} questionSerializer
   */
  questionSerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('questionSerializer', QuestionSerializer.create(Ember.getOwner(this).ownerInjection()));
  },

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
      learning_objective: assessmentModel.get("learningObjectives"),
      visible_on_profile: assessmentModel.get('isVisibleOnProfile')
    };
  },

  /**
   * Normalize the Assessment data into a Assessment object
   * @param assessmentData
   * @returns {Question}
   */
  normalizeReadAssessment: function(assessmentData){
    var serializer = this;
    return AssessmentModel.create(Ember.getOwner(this).ownerInjection(), {
      id: assessmentData.id,
      title: assessmentData.title,
      learningObjectives: assessmentData['learning_objective'],
      isVisibleOnProfile: assessmentData['visible_on_profile'] !== 'undefined' ? assessmentData['visible_on_profile'] : true,
      children: serializer.normalizeQuestions(assessmentData.question)
      // TODO Add more required properties here...
    });
  },

  normalizeQuestions: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload)) {
      return payload.map(function(item) {
        return serializer.get('questionSerializer').normalizeReadQuestion(item);
      });
    }
    return [];
  }

});

