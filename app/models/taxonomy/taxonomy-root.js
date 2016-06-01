import Ember from 'ember';

/**
 * Taxonomy Root
 *
 * @typedef {Object} TaxonomyRoot
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - Item ID
   */
  id: null,

  /**
   * @property {string} frameworkId - Standard Framework ID
   */
  frameworkId: null,

  /**
   * @property {string} title - Text label for this item
   */
  title: '',

  /**
   * @property {string} subjectTitle - Text label for the subject item
   */
  subjectTitle: '',

  /**
   * @property {string} code - Code for this item
   */
  code: '',

  /**
   * @property {TaxonomyItem[]} courses - List of courses
   */
  courses: [],

  /**
   * @property {TaxonomyRoot[]} children - List of frameworks
   */
  frameworks: []

});
