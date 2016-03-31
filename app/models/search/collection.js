import Ember from 'ember';

/**
 * Search Collection model with the collections information
 *
 * @typedef {Object} SearchCollectionModel
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - The collection id
   */
  id: null,

  /**
   * @property {string} title - The collection title
   */
  title: null,

  /**
   * @property {string} description - The collection description
   */
  description: null,

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
   */
  thumbnailUrl: null,

  /**
   * @property {string} course - The name of the course which this collection belongs to
   */
  course: null,

  /**
   * @property {Object} owner - The resource owner information
   */
  owner: null,

  /**
   * @property {Object[]} standards - The collection standards information
   */
  standards: null,

  /**
   *  @property {boolean} isPublic - Indicates if the collection is public
   */
  isPublic: false,

  /**
   *  @property {boolean} isAssessment - Indicates if the collection is a Assessment
   */
  isAssessment: false

});
