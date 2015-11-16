import Ember from 'ember';
import DS from 'ember-data';

/**
 * @typedef {Object} Collection
 */
export default DS.Model.extend({

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
   * @property {Array} List of libraries
   */
  libraries: DS.attr(),
  /**
   * @property {Array} List of resources associated to the collection
   */
  resources: DS.hasMany('search/resource'),

  /**
   * @property {boolean} hasResources
   */
  hasResources: Ember.computed.bool("resources.length"),

  /**
   * @property {Array} List of standards associated to the collection
   */
  standards: DS.hasMany('search/standard'),

  /**
   * Returns the last visited resource
   * @property {Resource} lastVisitedResource
   */
  lastVisitedResource: function(){
    //@todo implement logic to return the last visited, for returns the first one
    return this.get("hasResources") ? this.get("resources.fistObject") : null;
  }.property()

});
