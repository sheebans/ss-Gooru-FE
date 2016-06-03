import Ember from 'ember';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

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
  frameworks: [],

  /**
   * Category
   * @property {string}
   */
  category: Ember.computed("id", function(){
    const code = this.get("id").split(".")[1];
    const category = Ember.A(TAXONOMY_CATEGORIES).findBy("apiCode", code);
    return category ? category.value : null;
  }),

  /**
   * @property {boolean}
   */
  hasCourses: Ember.computed.bool("courses.length")

});
