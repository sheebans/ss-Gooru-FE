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
   * @property {Number} assessmentsTotal - total number of assessments in the lesson
   */
  assessmentCount: 0,

  /**
   * @property {Content/Lesson[]} children - List of collections/assessments
   */
  children: [],

  /**
   * @property {Number} collectionsTotal - total number of collections in the lesson
   */
  collectionCount: 0,

  /**
   * @property {String} id - Gooru id for the unit
   */
  id: '',

  /**
   * @property {String} sequence - sequence order among other course units
   */
  sequence: 0,

  /**
   * @property {String} standards - List of taxonomy terms
   */
  standards: [],

  /**
   * @property {String} title
   */
  title: ''

});
