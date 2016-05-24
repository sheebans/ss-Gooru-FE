import Ember from 'ember';

/**
 * Taxonomy Domain
 *
 * @typedef {Object} TaxonomyDomain
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - Domain ID
   */
  id: null,

  /**
   * @property {string} courseId - ID of the course this domain belongs to
   */
  courseId: null,

  /**
   * @property {string} name - Domain name
   */
  name: null

});
