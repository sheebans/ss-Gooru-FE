import Ember from 'ember';
import QuestionModel from 'gooru-web/models/content/question';
import AnswerModel from 'gooru-web/models/content/answer';

/**
 * Serializer to support the Question CRUD operations for API 3.0
 *
 * @typedef {Object} QuestionSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  /**
   * Serialize a Question object into a JSON representation required by the Create Question endpoint
   *
   * @param questionModel The Question model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateQuestion: function(questionModel) {
    const format = QuestionModel.serializeQuestionType(questionModel.get("type"));
    return {
      'title': questionModel.get('title'),
      'description': questionModel.get('description'),
      'content_subformat': format,
      'visible_on_profile': questionModel.get('isVisibleOnProfile')
    };
  },

  /**
   * Serialize a Question object into a JSON representation required by the Update Question endpoint
   *
   * @param questionModel The Question model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateQuestion: function(questionModel) {
    const serializer = this;
    return {
      title: questionModel.get('title'),
      description: questionModel.get('text'),
      //'content_subformat': QuestionModel.serializeQuestionType(questionModel.get("type")), // This is not supported on the back end yet
      'visible_on_profile': questionModel.get('isVisibleOnProfile'),
      answer: questionModel.get('answers').map(function(answer, index) {
        return serializer.serializerAnswer(answer, index + 1);
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
  serializerAnswer: function(answerModel, sequenceNumber) {
    return {
      'sequence': sequenceNumber,
      'is_correct': answerModel.get('isCorrect') ? 1 : 0,
      'answer_text': answerModel.get('text'),
      'answer_type': answerModel.get('type')
    };
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
    const standards = questionData.taxonomy || [];
    const question = QuestionModel.create(Ember.getOwner(this).ownerInjection(), {
      id: questionData.id,
      title: questionData.title,
      type: format,
      thumbnail: basePath + questionData.thumbnail,
      text: questionData.description,
      publishStatus: questionData.publish_status,
      standards: serializer.normalizeStandards(standards),
      hints: null, //TODO
      explanation: null, //TODO
      isVisibleOnProfile: typeof questionData['visible_on_profile'] !== 'undefined' ? questionData['visible_on_profile'] : true,
      order: index + 1//TODO is this ok?
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
      type: answerData['answer_type']
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
  }

});

