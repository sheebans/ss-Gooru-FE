import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter the assessment title.'
      })
    ]
  }
});

/**
 * Assessment model
 * typedef {Object} Assessment
 */
const Assessment = Ember.Object.extend(Validations, {

  /**
   * @property {Number} category - Category the course belongs to
   */
  category: 1,

  /**
   * @property {String} image - Assessment image url
   */
  image: '',

  /**
   * @property {String} subject
   */
  subject: '',

  /**
   * @property {String} learningObjectives
   */
  learningObjectives: '',

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
   * Return a copy of the assessment
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

    return Assessment.create(Ember.getOwner(this).ownerInjection(), properties);
  }

});

export default Assessment;
