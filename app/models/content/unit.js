import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true)
});

/**
 * Unit model
 *
 * @typedef {Object} Content/Unit
 */
export default Ember.Object.extend(Validations, {

  /**
   * @property {String} bigIdeas
   */
  bigIdeas: '',

  /**
   * @property {String} essentialQuestions
   */
  essentialQuestions: '',

  /**
   * @property {Number} id
   */
  id: 0,

  /**
   * @property {Boolean} isEditing
   */
  isEditing: false,

  /**
   * @property {String} sequence - sequence order among other course units
   */
  sequence: 0,

  /**
   * @property {String} title
   */
  title: ''

});
