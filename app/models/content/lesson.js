import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true)
});

/**
 * Lesson model
 *
 * @typedef {Object} Content/Lesson
 */
export default Ember.Object.extend(Validations, {

  /**
   * @property {Number} assessmentCount - total number of assessments in the lesson
   */
  assessmentCount: Ember.computed('children.[]', function() {
    return this.get('children').filterBy('isCollection', false).length;
  }),

  /**
   * @property {Content/Lesson[]} children - List of collections/assessments
   */
  children: Ember.A([]),

  /**
   * @property {Number} collectionCount - total number of collections in the lesson
   */
  collectionCount: Ember.computed('children.[]', function() {
    return this.get('children').filterBy('isCollection', true).length;
  }),

  /**
   * @property {String} id - Gooru id for the lesson
   */
  id: '',

  /**
   * @property {String} sequence - sequence order among other unit lessons
   */
  sequence: 0,

  /**
   * @property {String} standards - List of taxonomy terms
   */
  taxonomy: [],

  /**
   * @property {String} title
   */
  title: ''

});
