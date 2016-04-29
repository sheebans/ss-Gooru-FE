import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  text: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.add-question-answer-text'
      })
    ]
  }
});

/**
 * Answer model
 * typedef {Object} Answer
 */
const Answer = Ember.Object.extend(Validations,{

  /**
   * @property {Number} sequence - The order sequence of the answer
   */
  sequence: 0,

  /**
   * @property {Boolean} isCorrect - Indicates if the answers if correct or not
   */
  isCorrect: false,

  /**
   * @property {String} text - The answer text
   */
  text: null,

  /**
   * @property {String} type - The answer type
   */
  type: null

});

export default Answer;
