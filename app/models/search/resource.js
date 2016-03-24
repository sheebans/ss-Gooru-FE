import Ember from 'ember';

/**
 * Search Resource model with the resources information
 *
 * @typedef {Object} SearchResourceModel
 */
export default Ember.Object.extend({

  /**
   * @property {string} title - The resource title
   */
  title: null,

  /**
   * @property {string} description - The resource description
   */
  description: null,

  /**
   * @property {string} category - The resource category
   */
  category: null,

  /**
   * @property {string} format - The resource format
   */
  format: null,

  /**
   * @property {string} publisher - The resource publisher name
   */
  publisher: null,

  /**
   * @property {string} thumbnailUrl - The resource thumbnail url
   */
  thumbnailUrl: null,

  /**
   * @property {string} url - The resource url
   */
  url: null,

  /**
   * @property {Object} owner - The resource owner information
   */
  owner: null,

  /**
   * @property {Object[]} standards - The resource standards information
   */
  standards: null,

  /**
   * @property {boolean} isQuestion - Indicates if the resource is a Question
   */
  isQuestion: Ember.computed.equal('category', 'Question')

});
