import Ember from 'ember';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: {
    validators: [
      validator('presence', {
        presence: true,
        message:'Please enter the collection title.'
      })
    ]
  }
});

/**
 * Collection model
 * typedef {Object} Collection
 */
const Collection = Ember.Object.extend(Validations, {


  /**
   * @property {string}
   */
  id: null,

  /**
   * @property {Number} category - Category the course belongs to
   */
  category: 1,

  /**
   * @property {String} image - Collection image url
   */
  image: null,

  /**
   * @property {String} subject
   */
  subject: null,

  /**
   * @property {String} learningObjectives
   */
  learningObjectives: null,

  /**
   * @property {String} title
   */
  title: null,

  /**
   * @property {string} published|unpublished|requested
   */
  publishStatus: null,

  /**
   * @property {Boolean} isPublic
   */
  isPublic: Ember.computed.equal("publishedStatus", "published"), //TODO renamed by isPublished

  /**
   * @property {Boolean} isVisibleOnProfile
   */
  isVisibleOnProfile: false,

  /**
   * @property {Number[]} Array with the audience ids
   */
  audience:[],

  /**
   * @property {Object[]} standards - The collection standards information
   */
  standards: null,

  /**
   * @property {number} resourceCount - The number of resources in the collection
   */
  resourceCount: 0,

  /**
   * @property {number} questionCount - The number of questions in the collection
   */
  questionCount: 0,

  /**
   * @property {number} remixCount - The number of remixes made in the collection
   */
  remixCount: 0,

  /**
   * @property {string} thumbnailUrl - The thumbnail url
   * //TODO resolve url
   */
  thumbnailUrl: Ember.computed.alias("image"),

  /**
   * @property {string} course - The name of the course which this collection belongs to
   */
  course: null,

  /**
   * @property {Content/User} owner - The resource owner information
   */
  owner: null,


  /**
   * Return a copy of the collection
   *
   * @function
   * @return {Collection}
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

    return Collection.create(Ember.getOwner(this).ownerInjection(), properties);
  }

});

export default Collection;
