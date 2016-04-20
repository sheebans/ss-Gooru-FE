import Ember from 'ember';
import Resource from 'gooru-web/models/content/resource';
import Question from 'gooru-web/models/content/question';

/**
 * Object with all of the properties in a collection
 * These properties are also part of assessments
 *
 * @typedef {Object} CollectionBase
 * @see Collection
 * @see Assessment
 */
export default (function() {

  return {

    /**
     * @property {string}
     */
    id: null,

    /**
     * @property {Number} category - Category the course belongs to
     */
    category: 1,

    /**
     * @property {Ember.Array} children - List of collections/assessments
     */
    children: Ember.A(),

    /**
     * @property {Ember.Array} children - List of collections/assessments
     */
    computedResourceCount: Ember.computed('children.[]', function() {
      return this.get('children').filter(function(item) {
        return item instanceof Resource;
      }).length;
    }),

    /**
     * @property {Ember.Array} children - List of collections/assessments
     */
    computedQuestionCount: Ember.computed('children.[]', function() {
      return this.get('children').filter(function(item) {
        return item instanceof Question;
      }).length;
    }),

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
    audience: [],

    /**
     * @property {Object[]} standards - The collection standards information
     */
    standards: [],

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
    copy: function () {

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
    }

  };
})();
