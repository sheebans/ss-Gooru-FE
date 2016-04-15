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
   * @property {String} id - Gooru id for the unit
   */
  id: null,

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
   * @property {Number} lessonsTotal - total number of lessons in the unit
   */
  lessonCount: 0,

  /**
   * @property {String} sequence - sequence order among other course units
   */
  sequence: 0,

  /**
   * @property {String} title
   */
  title: '',

  /**
   * @property {String[]} taxonomy - Taxonomy array
   */
  taxonomy: null

});
