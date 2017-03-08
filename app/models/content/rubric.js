import Ember from 'ember';

/**
 * Rubric model
 * typedef {Object} Rubric
 */
export default Ember.Object.extend({
  /**
   * @property {string} id
   */
  id:'',
  /**
   * @property {Category[]} categories
   */
  categories:Ember.A([]),
  /**
   * @property {string} mimeType
   */
  mimeType:'application/pdf,image/*',
  /**
   * @property {string} title
   */
  title:'',
  /**
   * @property {string} URL
   */
  url:''
});
