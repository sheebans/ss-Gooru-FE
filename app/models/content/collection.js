import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: [
    validator('presence', true),
    validator('length', {
      max: 50
    })
  ],
  learningObjectives: validator('length', {max: 500})
});

/**
 * Collection model
 * typedef {Object} Collection
 */
const Collection = Ember.Object.extend(Validations, {

  /**
   * @property {Number} category - Category the course belongs to
   */
  category: 1,

  /**
   * @property {String} image - Collection image url
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
   * Return a copy of the collection
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
      'learningObjectives',
      'title',
      'isPublic'
    ]);
    var audience = this.get('audience');

    // Copy the audience values
    copiedProperties.audience = audience.slice(0);

    return Collection.create(Ember.getOwner(this).ownerInjection(), copiedProperties);
  }

});

export default Collection;
