import Ember from 'ember';

/**
 * Taxonomy Course
 *
 * @typedef {Object} TaxonomyCourse
 */
export default Ember.Object.extend({

  /**
   * @property {string} id - Course ID
   */
  id: null,

  /**
   * @property {string} subjectId - ID of the subject this course belongs to
   */
  subjectId: null,

  /**
   * @property {string} name - Course name
   */
  name: null,

  /**
   * TODO: What is this for?
   * @property {string} grades - Course grades
   */
  grades: []

});
