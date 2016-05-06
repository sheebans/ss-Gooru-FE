import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message: '{{description}}',
        descriptionKey: 'common.errors.add-course-title'
      })
    ]
  },
  description: {
  validators: [
    validator('length', {
      max: 500,
      message: '{{description}}',
      descriptionKey: 'common.warnings.character-limit'
    })
  ]
}
});

/**
 * Course model
 * typedef {Object} Course
 */
export default Ember.Object.extend(Validations, {

  /**
   * @property {String} id - The Course Id
   */
  id: null,

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
  thumbnailUrl: Ember.computed.alias("image"),

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
   * @property {Number} Number of units in the course
   */
  unitCount: 0,

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

    return this.get('constructor').create(Ember.getOwner(this).ownerInjection(), properties);
  },

  /**
   * Copy a list of property values from another model to override the current ones
   *
   * @function
   * @param {Course} model
   * @param {String[]} propertyList
   * @return {null}
   */
  merge: function(model, propertyList = []) {
    var properties = model.getProperties(propertyList);
    this.setProperties(properties);
  }

});
