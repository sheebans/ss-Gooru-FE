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
   * @property {Content/Lesson[]} children - List of unit lessons
   */
  children: [],

  /**
   * @property {String} essentialQuestions
   */
  essentialQuestions: '',

  /**
   * @property {String} id - Gooru id for the unit
   */
  id: '',

  /**
   * @property {Boolean} isEditing
   */
  isEditing: false,

  /**
   * @property {Number} lessonsTotal - total number of lessons in the unit
   */
  lessonsTotal: 0,

  /**
   * @property {String} sequence - sequence order among other course units
   */
  sequence: 0,

  /**
   * @property {String} title
   */
  title: ''

});
