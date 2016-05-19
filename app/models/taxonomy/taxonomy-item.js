import Ember from 'ember';

/**
 * Taxonomy Item
 *
 * @typedef {Object} TaxonomyItem
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - Item ID
   */
  id: null,

  /**
   * @property {string} label - Text label for this item
   */
  label: null


});
