import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true),
});

/**
 * Course model
 * typedef {Object} Course
 */
const Course = Ember.Object.extend(Validations, {

  /**
   * @property {Number} category - Category the course belongs to
   */
  category: 1,

  /**
   * @property {String} image - Course image url
   */
  image: '',

  /**
   * @property {String} subject
   */
  subject: '',

  /**
   * @property {String} title
   */
  title: '',

  /**
   * @property {Boolean} isPublic
   */
  isPublic: false,

  /**
   * @property {Number[]} Array with the audience ids
   */
  audience:[],

  /**
   * Return a copy of the course
   *
   * @function
   * @return {Course}
   */
  copy: function() {

    // Copy the course data
    var copiedProperties = this.getProperties([
      'category',
      'image',
      'subject',
      'title',
      'isPublic'
    ]);
    var audience = this.get('audience');

    // Copy the audience values
    copiedProperties.audience = audience.slice(0);

    return Course.create(Ember.getOwner(this).ownerInjection(), copiedProperties);
  }

});

export default Course;
