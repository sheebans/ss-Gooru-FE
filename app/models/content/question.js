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
  description: null,

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
  owner: null



});

export default Question;
