import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter the question title.'
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
   * @property {String} title
   */
  title: '',
  /**
   * @property {String} type
   */
  type:''


});

export default Question;
