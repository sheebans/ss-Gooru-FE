import Ember from 'ember';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

/**
 * Taxonomy selector component
 *
 * Component responsible for displaying/editing a category, subject and subject course values
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
    setCategory(categoryValue) {
      this.set('editObject.category', categoryValue);
    },
    /**
     * Set Subject
     */
    setSubject(subject, isPrimary) {
      if (isPrimary) {
        this.set('primarySubject', subject);
      } else {
        this.set('secondarySubject', subject);
      }
    },
    /**
     * Toggles the appearance of the secondary subject
     */
    toggleSecondary() {
      this.toggleProperty('hasSecondary');
      if (!this.get('hasSecondary')) {
        this.set('secondarySubject', null);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'gru-taxonomy-selector'],

  // -------------------------------------------------------------------------
  // Events

  didInsertElement() {
    var category = this.get('srcObject.category');
    if (!category) {
      this.set('srcObject.category', TAXONOMY_CATEGORIES[0].value);
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Ember.A} categories - List of course categories
   */
  categories: TAXONOMY_CATEGORIES,

  /**
   * Is the course being edited or not?
   * @property {Boolean}
   */
  isEditing: null,

  /**
   * @type {Object} The object in edit mode
   */
  editObject: null,

  /**
   * @type {Object} The initial object in edit mode
   */
  srcObject: null,

  /**
   * @type {Object} The selected subject
   */
  primarySubject: null,

  /**
   * @type {Object} The selected secondary subject
   */
  secondarySubject: null,

  /**
   * @type {Boolean} Indicates id the entity has a secondary subject
   */
  hasSecondary: false,

  /**
   * @type {Array} List of subjects
   */
  subjectList: Ember.A([
    {id: "K12.Science", title: "Science"},
    {id: "K12.Math", title: "Math", subjectStandardFrameworks: [
      {id: "K12.Math.CCSS", title: "Common Core State Standards"},
      {id: "K12.Math.TEKS", title: "Texas Essential Knowledge and Skills"},
      {id: "K12.Math.LWMS", title: "Learning What Matters Standards"}
    ]},
    {id: "K12.ELA", title: "English Language Arts"},
    {id: "K12.SS", title: "Social Studies"},
    {id: "K12.VPA", title: "Visual and Performing Arts"},
    {id: "K12.Health", title: "Health"},
    {id: "K12.PhEd", title: "Physical Education"},
    {id: "K12.ESL", title: "English as a Second Language"},
    {id: "K12.HS", title: "Habits of Success"},
    {id: "K12.WL", title: "World Languages"},
    {id: "K12.PF", title: "Personal Finance"},
    {id: "K12.CS", title: "Computer Science"}
  ])
});
