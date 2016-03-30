import Ember from 'ember';
import { COURSE_CATEGORIES } from 'gooru-web/config/config';

/**
 * Category component
 *
 * Component responsible for displaying/editing a category value
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Set Category
     */
    setCategory: function (categoryValue) {
      this.set('editCategory', categoryValue);
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-category'],


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Ember.A} categories - List of course categories
   */
  categories: COURSE_CATEGORIES,

  /**
   * Is the course being edited or not?
   * @property {Boolean}
   */
  isEditing: null,

  /**
   * @type {Number} Edited category value
   */
  editCategory: null,

  /**
   * @type {Number} Initial category value
   */
  srcCategory: null

});
