import Ember from 'ember';
import { cleanFilename } from 'gooru-web/utils/utils';
import AssessmentModel from 'gooru-web/models/content/assessment';
import QuestionSerializer from 'gooru-web/serializers/content/question';

/**
 * Serializer to support the Assessment CRUD operations for API 3.0
 *
 * @typedef {Object} AssessmentSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

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
      visible_on_profile: assessmentModel.get('isVisibleOnProfile'),
      thumbnail: cleanFilename(assessmentModel.image)
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
      id: payload.id,
      title: payload.title,
      image: payload.thumbnail,
      learningObjectives: payload['learning_objective'],
      isVisibleOnProfile: payload['visible_on_profile'] ? payload['visible_on_profile'] : true,
      children: serializer.normalizeQuestions(payload.question),
      questionCount: payload.question_count ? payload.question_count : 0,
      sequence: payload.sequence_id,
      image: assessmentData.thumbnail ? serializer.get('session.cdnUrls.content') + assessmentData.thumbnail : null
      // TODO Add more required properties here...
    });
  },

  normalizeQuestions: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload)) {
      return payload.map(function(item, index) {
        return serializer.get('questionSerializer').normalizeReadQuestion(item, index);
      });
    }
    return [];
  }

});

