import Ember from 'ember';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';

/**
 * Taxonomy Tag
 *
 * Model representation of a taxonomy item as a tag
 *
 * @typedef {Object} TaxonomyTag
 */
export default TaxonomyItem.extend({

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
  isRemovable: false

});
