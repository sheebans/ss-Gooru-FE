import Ember from 'ember';
import { cleanFilename } from 'gooru-web/utils/utils';
import QuestionModel from 'gooru-web/models/content/question';
import AnswerModel from 'gooru-web/models/content/answer';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';

/**
 * Serializer to support the Question CRUD operations for API 3.0
 *
 * @typedef {Object} QuestionSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('taxonomySerializer', TaxonomySerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Serialize a Question object into a JSON representation required by the Create Question endpoint
   *
   * @param questionModel The Question model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateQuestion: function(questionModel) {
    const serializer = this;
    const format = QuestionModel.serializeQuestionType(questionModel.get("type"));
    const answers = questionModel.get('answers');
    var serializedQuestion = {
      'title': questionModel.get('title'),
      'description': questionModel.get('description'),
      'narration': questionModel.get('narration'),
      'content_subformat': format,
      'visible_on_profile': questionModel.get('isVisibleOnProfile')
    };
    if (answers.length) {
      serializedQuestion.answer = answers.map(function(answer, index) {
        return serializer.serializerAnswer(answer, index + 1);
      });
    }
    return serializedQuestion;
  },

  /**
   * Serialize a Question object into a JSON representation required by the Update Question endpoint
   *
   * @param questionModel The Question model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateQuestion: function(questionModel) {
    const serializer = this;
    const isHotSpotImage = questionModel.get('isHotSpotImage');
    return {
      title: questionModel.get('title'),
      description: questionModel.get('text'),
      narration: questionModel.get('narration'),
      //'content_subformat': QuestionModel.serializeQuestionType(questionModel.get("type")), // This is not supported on the back end yet
      taxonomy: serializer.get('taxonomySerializer').serializeTaxonomy(questionModel.get('standards')),
      'visible_on_profile': questionModel.get('isVisibleOnProfile'),
      answer: questionModel.get('answers').map(function(answer, index) {
        return serializer.serializerAnswer(answer, index + 1, isHotSpotImage);
      })
    };
  },

  /**
   * Serialize an Answer model object into a JSON representation required by the Update Question endpoint
   *
   * @param answerModel - the Answer model to be serialized
   * @param sequenceNumber - the answer's sequence number
   * @returns {Object}
   */
  serializerAnswer: function(answerModel, sequenceNumber, isHotSpotImage) {
    var serializedAnswer = {
      'sequence': sequenceNumber,
      'is_correct': answerModel.get('isCorrect') ? 1 : 0,
      'answer_text': isHotSpotImage ? cleanFilename(answerModel.get('text')) : answerModel.get('text'),
      'answer_type': answerModel.get('type')
    };
    if (answerModel.get('highlightType')) {
      serializedAnswer['highlight_type'] = answerModel.get('highlightType');
    }
    return serializedAnswer;
  },

  /**
   * Normalize the question data into a Question object
   * @param questionData
   * @param index optional index value, corresponds to the assessment or collection index
   * @returns {Question}
   */
  normalizeReadQuestion: function(questionData, index){
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const format = QuestionModel.normalizeQuestionType(questionData.content_subformat);
    const standards = questionData.taxonomy || {};
    const question = QuestionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: questionData.id,
      title: questionData.title,
      narration: questionData.narration,
      type: format,
      thumbnail: questionData.thumbnail ? (basePath + questionData.thumbnail) : null,
      text: questionData.description,
      publishStatus: questionData.publish_status,
      owner: questionData.creator_id,
      standards: serializer.get('taxonomySerializer').normalizeTaxonomyObject(standards),
      hints: null, //TODO
      explanation: null, //TODO
      isVisibleOnProfile: typeof questionData['visible_on_profile'] !== 'undefined' ? questionData['visible_on_profile'] : true,
      order: questionData.sequence_id || (index + 1)
    });

    const answers = serializer.normalizeAnswerArray(questionData.answer);
    if (question.get("isHotSpotImage")){
      answers.forEach(function(answer){ //adding the basepath for HS Image
        answer.set("text", basePath + answer.get("text"));
      });
    }
    question.set("answers", answers);
    return question;
  },

  /**
   * Normalize an array of answers
   *
   * @param answerArray array of answers coming from the endpoint
   * @returns {AnswerModel[]}
   */
  normalizeAnswerArray: function(answerArray) {
    const serializer = this;
    let result = Ember.A([]);
    if (answerArray && Ember.isArray(answerArray)) {
      result = answerArray.map(function(answerData) {
        return serializer.normalizeAnswer(answerData);
      });
    }
    return result;
  },

  /**
   * Normalize a single answer into a Answer object
   *
   * @param answerData Answer data
   * @returns {Answer}
   */
  normalizeAnswer: function(answerData) {
    const id = answerData.sequence; //TODO this is risky the ideal scenario would be to have an id
    return AnswerModel.create(Ember.getOwner(this).ownerInjection(),{
      id: `answer_${id}`,
      sequence: answerData.sequence,
      isCorrect: answerData['is_correct'] === 1 || answerData['is_correct'] === true,
      text: answerData['answer_text'],
      type: answerData['answer_type'],
      highlightType: answerData['highlight_type']
    });
  }

});

