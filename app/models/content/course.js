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
   * @property {String} image - Course image url
   */
  // TODO This property will be replaced by thumbnailUrl
  image: '',

  /**
   * @property {Boolean} isPublic
   */
  // TODO This property probably will be replaced isVisibleOnProfile
  isPublic: false,

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
   * @property {Number[]} Array with the audience ids
   */
  audience:[],

  /**
   * @property {String[]} Course taxonomy array
   */
  taxonomy: [],

  /**
   * @property {String} subject
   */
  subject: '',

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
      'title',
      'description',
      'thumbnailUrl',
      'isVisibleOnProfile',
      'audience',
      'taxonomy',
      'subject'
    ]);
    // TODO Do we want to copy just one value here?
    var audience = this.get('audience');
    // Copy the audience values
    copiedProperties.audience = audience.slice(0);

    return Course.create(Ember.getOwner(this).ownerInjection(), copiedProperties);
  }

});

export default Course;
