import Ember from 'ember';
import QuestionModel from 'gooru-web/models/content/question';

/**
 * Serializer to support the Question CRUD operations for API 3.0
 *
 * @typedef {Object} QuestionSerializer
 */
export default Ember.Object.extend({


  /**
   * Serialize a Question object into a JSON representation required by the Create Question endpoint
   *
   * @param questionModel The Question model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateQuestion: function(questionModel) {
    const format = QuestionModel.serializeQuestionType(questionModel.get("type"));
    return {
      title: questionModel.get('title'),
      content_subformat: format
    };
  },

  /**
   * Normalize the question data into a Content/Question object
   * @param questionData
   * @returns {Content/Question}
   */
  normalizeReadQuestion: function(questionData){
    const serializer = this;
    const format = QuestionModel.normalizeQuestionType(questionData.content_subformat);
    const standards = questionData.taxonomy || [];
    return QuestionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: questionData.id,
      title: questionData.title,
      type: format,
      description: questionData.description,
      publishStatus: questionData.publish_status,
      standards: serializer.normalizeStandards(standards),
      answers: null, //TODO the structure is missing some info at the API
      hints: null, //TODO
      explanation: null //TODO
    });
  },

  /**
   * Normalizes standards
   * @param {string[]} payload
   * @returns {Content/User}
   */
  normalizeStandards: function (standards) {
    return standards.map(function(standard){
      return Ember.Object.create({ code: standard, description: null });
    });
  },



});

