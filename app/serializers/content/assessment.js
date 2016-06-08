import Ember from 'ember';
import { cleanFilename } from 'gooru-web/utils/utils';
import AssessmentModel from 'gooru-web/models/content/assessment';
import QuestionSerializer from 'gooru-web/serializers/content/question';
import { DEFAULT_IMAGES } from "gooru-web/config/config";
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';

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

  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('questionSerializer', QuestionSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('taxonomySerializer', TaxonomySerializer.create(Ember.getOwner(this).ownerInjection()));
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
    const serializer = this;
    var serializedAssessment = this.serializeAssessment(assessmentModel);
    serializedAssessment.taxonomy = serializer.get('taxonomySerializer').serializeTaxonomy(assessmentModel.get('standards'));
    return serializedAssessment;
  },

  serializeAssessment: function(assessmentModel) {
    const thumbnail = cleanFilename(assessmentModel.get("thumbnailUrl"));
    return {
      title: assessmentModel.get('title'),
      learning_objective: assessmentModel.get("learningObjectives"),
      visible_on_profile: assessmentModel.get('isVisibleOnProfile'),
      thumbnail: !Ember.isEmpty(thumbnail) ? thumbnail : null
    };
  },

  /**
   * Normalize the Assessment data into a Assessment object
   * @param assessmentData
   * @returns {Question}
   */
  normalizeReadAssessment: function(assessmentData){
    var serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl = assessmentData.thumbnail ?
    basePath + assessmentData.thumbnail : DEFAULT_IMAGES.ASSESSMENT;

    return AssessmentModel.create(Ember.getOwner(this).ownerInjection(), {
      id: assessmentData.id,
      title: assessmentData.title,
      learningObjectives: assessmentData['learning_objective'],
      isVisibleOnProfile: assessmentData['visible_on_profile'] !== false,
      children: serializer.normalizeQuestions(assessmentData.question),
      questionCount: assessmentData.question_count ? assessmentData.question_count : 0,
      sequence: assessmentData.sequence_id,
      thumbnailUrl: thumbnailUrl,
      standards: serializer.get('taxonomySerializer').normalizeTaxonomy(assessmentData.taxonomy),
      format: assessmentData.format,
      url: assessmentData.url
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
  },

  /**
   * Serialize reorder assessment
   * @param {string[]} questionIds
   */
  serializeReorderAssessment: function (questionIds) {
    const values = questionIds.map(function(id, index) {
      return { "id" : id, "sequence_id" : index + 1 };
    });

    return {
      "order": values
    };
  }


});

