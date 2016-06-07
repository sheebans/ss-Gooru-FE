import Ember from 'ember';
import { TAXONOMY_LEVELS } from 'gooru-web/config/config';
import { getTaxonomyAncestors } from 'gooru-web/utils/utils';

/**
 * Taxonomy Tag Data
 *
 * Model representation of a taxonomy tag
 *
 * @typedef {Object} TaxonomyTagData
 */
var TaxonomyTagData = Ember.Object.extend({

  /**
   * @property {String} id
   */
  id: null,

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
        value = this.get('frameworkCode') + ' ' + this.get('parentTitle');
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
  taxonomyLevel: TAXONOMY_LEVELS.STANDARD,

  /**
   * @property {String[]} Path useful to find taxonomy items @see TaxonomyItem#find
   */
  ancestorsPath: Ember.computed('taxonomyLevel', function() {
    var level = this.get('taxonomyLevel');
    var ancestors = getTaxonomyAncestors(this.get('id'));

    if (level === TAXONOMY_LEVELS.MICRO || level === TAXONOMY_LEVELS.STANDARD) {
      return [ancestors.courseId, ancestors.domainId];
    } else {
      // Assume it's at a domain level
      return [ancestors.courseId];
    }
  })

});

TaxonomyTagData.reopenClass({

  /**
   * @function Create a taxonomy tag data instance from an existing taxonomy item
   * @static
   * @param {TaxonomyItem} taxonomyItem
   * @param {TaxonomyRoot} subject - Taxonomy item subject
   * @return {TaxonomyTagData}
   */
  createFromTaxonomyItem: function(taxonomyItem, subject) {
    var level = taxonomyItem.get('level');
    var tagData = TaxonomyTagData.create({
      id: taxonomyItem.get('id'),
      title: taxonomyItem.get('title'),
      code: taxonomyItem.get('code'),
      description: taxonomyItem.get('description'),
      frameworkCode: subject.get('frameworkId')
    });

    switch(level) {
      case 2:
        tagData.setProperties({
          parentTitle: `${taxonomyItem.get('parent.title')} ${subject.get('subjectTitle')}`,
          taxonomyLevel: TAXONOMY_LEVELS.DOMAIN
        }); break;
      case 3:
      case 4:
      case 5:
        tagData.setProperties({
          parentTitle: subject.get('subjectTitle'),
          taxonomyLevel: TAXONOMY_LEVELS.STANDARD
        }); break;
      case 6:
        tagData.setProperties({
          parentTitle: taxonomyItem.get('parent.title'),
          taxonomyLevel: TAXONOMY_LEVELS.MICRO
        }); break;
    }

    return tagData;
  },

  /**
   * It returns only standards related to the subject
   * @param {TaxonomyRoot} subject
   * @param {TaxonomyTagData[]} standards
   */
  filterBySubject: function(subject, standards) {
    const id = subject.get("id");
    return standards.filter(function(standard){
      return standard.get("id").indexOf(id) >= 0;
    });
  },

  /**
   * It returns only standards non related to the subject
   * @param {TaxonomyRoot} subject
   * @param {TaxonomyTagData[]} standards
   */
  filterByNotInSubject: function(subject, standards) {
    const id = subject.get("id");
    return standards.filter(function(standard){
      return standard.get("id").indexOf(id) < 0;
    });
  }

});

export default TaxonomyTagData;
