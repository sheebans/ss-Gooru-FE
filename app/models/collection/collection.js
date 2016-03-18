import Ember from 'ember';
import DS from 'ember-data';

/**
 * @typedef {Object} Collection
 */

export default DS.Model.extend({

  /**
   * @property {string} Collection's type
   */
  collectionType: DS.attr('string'),

  /**
   * @property {string} Collection's title
   */
  title: DS.attr('string'),
  /**
   * @property {string} Collection's remixes
   */
  remixes: DS.attr('number'),
  /**
   * @property {string} Collection's views
   */
  views: DS.attr('number'),
  /**
   * @property {string} Collection's image url
   */
  imageUrl: DS.attr('string'),
  /**
   * @property {string} Collection's url
   */
  url: DS.attr('string'),
  /**
   * @property {string} Collection's author
   */
  author: DS.attr('string'),
  /**
   * @property {string} Collection's author id
   */
  authorId: DS.attr('string'),
  /**
   * @property {Array} List of Collection's Remixed by
   */
  remixedBy: DS.attr(''),
  /**
   * @property {string} Collection's Course
   */
  course: DS.attr('string'),

  /**
   * @property {string} Author's avatar
   */
  avatarUrl: DS.attr('string'),
  /**
   * @property {string} Author's profile page url
   */
  profilePageUrl: DS.attr('string'),
  /**
   * @property {string} Collection's description
   */
  description: DS.attr('string'),
  /**
   * @property {number} Total of resources in the collection
   */
  resourceCount: DS.attr('number'),
  /**
   * @property {number} Total of questions in the collection
   */
  questionCount: DS.attr('number'),
  /**
   * @property {boolean} It says if collection's owner has a team
   */
  hasTeam: DS.attr('boolean'),
  /**
   * @property {boolean} It says if collection's is visible or not
   */
  visibility: DS.attr('boolean'),
  /**
   * @property {Array} List of libraries
   */
  libraries: DS.attr(),
  /**
   * @property {Array} List of resources associated to the collection
   */
  resources: DS.hasMany('resource/resource'),

  /**
   * @property {Array} List of standards associated to the collection
   */
  standards: DS.hasMany('search/standard'),

  /**
   * @property {boolean} hasResources
   */
  hasResources: Ember.computed.bool("resources.length"),

  /**
   * @property {boolean} Returnn true is the collection is an assessment
   */
  isAssessment: Ember.computed.equal('collectionType', 'assessment'),


  /**
   * Gets the next resource based on the resource provided
   * @param {Resource} resource
   * @returns {Resource|undefined} next resource
   */
  nextResource: function(resource){
    var next;
    if (this.get("hasResources")){
      const resources = this.get("resources"),
        index = resources.indexOf(resource);
      next = resources.objectAt(index + 1);
    }
    return next;
  },

  /**
   * Gets the previous resource based on the resource provided
   * @param {Resource} resource
   * @returns {Resource|undefined} previous resource
   */
  prevResource: function(resource){
    var next;
    if (this.get("hasResources")){
      const resources = this.get("resources"),
        index = resources.indexOf(resource);
      next = resources.objectAt(index - 1);
    }
    return next;
},

  /**
   * Gets the resource by id
   * @param {string }resourceId
   * @returns {Resource|undefined}
   */
  getResourceById: function(resourceId){
    var resource;
    if (this.get("hasResources")){
      const resources = this.get("resources").filterBy("id", resourceId);
      if (resources.get("length")){
        resource = resources.get("firstObject");
      }
    }
    return resource;
  },

  /**
   * Returns true if it's the last resource of the collection
   * @param {Resource}resource
   * @returns {Resource|undefined}
   */
  isLastResource: function(resource) {
    const resources = this.get("resources");
    var index = resources.indexOf(resource);
    var collectionLength = resources.get('length');
    return ((index + 1) === collectionLength);
  }

});


