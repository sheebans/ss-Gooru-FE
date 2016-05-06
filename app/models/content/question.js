import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';
import {getQuestionApiType, getQuestionTypeByApiType, QUESTION_TYPES} from 'gooru-web/config/question';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.add-question-title'
      })
    ]
  },
  text: {
    validators: [
      validator('length', {
        max: 5000,
        message: '{{description}}',
        descriptionKey: 'common.warnings.character-limit'
      })
    ]
  }
});

/**
 * Question model
 * typedef {Object} Question
 */
const Question = Ember.Object.extend(Validations, {

  /**
   * @property {string}
   */
  id: null,

  /**
   * @property {string} title
   */
  title: null,

  /**
   * Possible question types
   * @property {string} type
   */
  type: null,

  /**
   * Resource format, in this case it is question
   * @property {string}
   */
  format: 'question',

  /**
   * @property {string}
   */
  text: null,

  /**
   * @property {string} published|unpublished|requested
   */
  publishStatus: null,

  /**
   * @property {Boolean} isPublic
   */
  isPublic: Ember.computed.equal("publishedStatus", "published"),

  /**
   * @property { Content/User }
   */
  owner: null,

  /**
   * @property { { code: string, description: string }[] }
   */
  standards: null,

  /**
   * @property {Boolean} isVisibleOnProfile - Indicates if the Question is visible on Profile. By default it is true
   */
  isVisibleOnProfile: true,

  /**
   * @property {Answer[]} answers - Array of answers
   */
  answers: Ember.A([]),

  /**
   * @property {Boolean} isFIB - Indicates is the question type is FIB
   */
  isFIB: Ember.computed.equal('type', QUESTION_TYPES.fib),

  /**
   * @property {Boolean} isHSText - Indicates is the question type is HS_TXT
   */
  isHSText: Ember.computed.equal('type', QUESTION_TYPES.hotSpotText),

  /**
   *  @property {string} questionType - Alias for type property
   */
  questionType: Ember.computed.alias('type'),

  /**
   * Return a copy of the question
   *
   * @function
   * @return {Question}
   */
  copy: function() {

    var properties = [];
    var enumerableKeys = Object.keys(this);

    for (let i = 0; i < enumerableKeys.length; i++) {
      let key = enumerableKeys[i];
      let value = Ember.typeOf(this.get(key));
      if (value === 'string' || value === 'number' || value === 'boolean') {
        properties.push(key);
      }
    }

    // Copy the question data
    properties = this.getProperties(properties);

    var answersForEditing = this.get('answers').map(function(answer) {
      return answer.copy();
    });
    properties.answers = answersForEditing;


    return Question.create(Ember.getOwner(this).ownerInjection(), properties);
  }


});

Question.reopenClass({

  /**
   * Serializes the question type to be API compliant
   * @param type
   * @returns {string}
   * TODO move to util
   */
  serializeQuestionType: function (type) {
    return getQuestionApiType(type);
  },

  /**
   * Converts several app format values to api values
   * @param {string[]} values values to format
   * TODO move to util
   */
  serializeAllQuestionType: function(values){
    const model = this;
    return values.map(function(type){
      return model.serializeQuestionType(type);
    });
  },

  /**
   * Normalizes the question type to be App compliant
   * @param format
   * @returns {string}
   * TODO move to util
   */
  normalizeQuestionType: function (apiType) {
    return getQuestionTypeByApiType(apiType);
  }
});

export default Question;
