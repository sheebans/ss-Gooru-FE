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
  // TODO We need to revisit this property, probably it will be a string
  category: 1,

  /**
   * @property {Content/Unit[]} children - List of course units
   */
  children: [],

  /**
   * @property {String} image - Course image url
   */
  // TODO This property will be replaced by thumbnailUrl
  image: '',

  /**
   * @property {String} title
   */
  title: '',

  /**
   *  @property {String} Course description
   */
  description: '',

  /**
   * @property {String} Course thumbnail url
   */
  thumbnailUrl: '',

  /**
   * @property {Boolean} Is this course visible on profile
   */
  isVisibleOnProfile: true,

  /**
   * @property {Boolean} isPublished When a course is set as published
   */
  isPublished: false,

  /**
   * @property {Number[]} Array with the audience ids
   */
  audience:[],

  /**
   * @property {String} subject
   */
  subject: '',

  /**
   * @property {String[]} Course taxonomy array
   */
  taxonomy: [],

  /**
   * Return a copy of the course
   *
   * @function
   * @return {Course}
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

    // Copy the course data
    properties = this.getProperties(properties);

    var audience = this.get('audience');

    // Copy the audience values
    properties.audience = audience.slice(0);

    return Course.create(Ember.getOwner(this).ownerInjection(), properties);
  }

});

export default Course;
