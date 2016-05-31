import Ember from 'ember';

/**
 * Taxonomy Tag
 *
 * Model of a visual representation of a taxonomy tag
 *
 * @typedef {Object} TaxonomyTag
 */
export default Ember.Object.extend({

  /**
   * @property {boolean} isActive - Is the state of the tag active or not?
   */
  isActive: false,

  /**
   * @property {boolean} isReadonly - Is the tag read-only or does it accept changes
   * to its state
   */
  isReadonly: false,

  /**
   * @property {boolean} isRemovable - Can the tag be removed or not?
   */
  isRemovable: false,

  /**
   * @property {TaxonomyTagData} data - Data for the taxonomy tag
   */
  data: null

});
