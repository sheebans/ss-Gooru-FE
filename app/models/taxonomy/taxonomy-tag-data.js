import Ember from 'ember';
import { TAXONOMY_LEVELS } from 'gooru-web/config/config';

/**
 * Taxonomy Tag Data
 *
 * Model representation of a taxonomy tag
 *
 * @typedef {Object} TaxonomyTagData
 */
export default Ember.Object.extend({

  /**
   * @property {String} title
   */
  title: '',

  /**
   * @property {String} code
   */
  code: '',

  /**
   * @property {String} description
   */
  description: '',

  /**
   * @property {String} framework code
   */
  frameworkCode: '',

  /**
   * @property {String} parentTitle - Text label
   */
  parentTitle: '',

  /**
   * @property {String} label - Text label
   */
  label: Ember.computed('taxonomyLevel', function() {
    return (this.get('taxonomyLevel') === TAXONOMY_LEVELS.STANDARD) ?
      this.get('code') : this.get('title');
  }),

  /**
   * @property {String} caption - Additional detail for the label
   */
  caption: Ember.computed('taxonomyLevel', function() {
    var taxonomyLevel = this.get('taxonomyLevel');
    var value;

    switch(taxonomyLevel) {
      case TAXONOMY_LEVELS.STANDARD:
      case TAXONOMY_LEVELS.COURSE:
        value = this.get('frameworkCode') + this.get('parentTitle');
        break;
      case TAXONOMY_LEVELS.DOMAIN:
        value = this.get('parentTitle');
        break;
      default:
        // Micro standards
        value = this.get('code');
    }
    return value;
  }),

  /**
   * @property {String} taxonomyLevel
   */
  taxonomyLevel: TAXONOMY_LEVELS.STANDARD

});
