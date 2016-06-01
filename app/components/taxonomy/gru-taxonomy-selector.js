import Ember from 'ember';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';
import { getCategoryFromSubjectId } from 'gooru-web/utils/taxonomy';

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
  // Dependencies

  /**
   * @requires service:taxonomy
   */
  taxonomyService: Ember.inject.service("taxonomy"),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Set Category
     */
    setCategory(categoryValue) {
      this.set('editCategory', categoryValue);
      this.set('editEntity.mainSubject', null);
      this.set('secondarySubject', null);
      this.setLists();
    },
    /**
     * Set Subject
     */
    setSubject(subject, isPrimary) {
      if (isPrimary) {
        this.set('editEntity.mainSubject', subject);
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

  classNames: ['taxonomy', 'gru-taxonomy-selector'],

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Ember.A} categories - List of course categories
   */
  categories: TAXONOMY_CATEGORIES,

  /**
   * Is the entity being edited or not?
   * @property {Boolean}
   */
  isEditing: null,

  /**
   * @type {String} The source entity
   */
  srcEntity: null,

  /**
   * @type {Object} The entity in edit mode
   */
  editEntity: null,

  /**
   * @type {Boolean} Allows the component to display a secondary subject
   */
  enableSecondarySubject: false,

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
  subjectList: null,

  /**
   * @type {String} the original category (before editing)
   */
  originalCategory: Ember.computed('srcEntity.subject', function() {
    return getCategoryFromSubjectId(this.get('srcEntity.subject'));
  }),

  /**
   * @type {String} the selected category
   */
  editCategory: null,

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Sets the corresponding lists of subjects and courses when the primary subject changes
   */
  setLists: Ember.observer('editEntity.mainSubject', function() {
    var component = this;
    var subject = component.get('editEntity.mainSubject');
    component.get('taxonomyService').getSubjects(component.get('editCategory')).then(function(subjects) {
      component.set('subjectList', subjects);
    });
    if (subject) {
      if (!subject.get('courses') || subject.get('courses').length === 0) {
        component.get('taxonomyService').retrieveSubjectCourses(subject);
      }
    }
  }),

  /**
   * Resets the category when enters to editing mode
   */
  resetEditCategory: Ember.observer('isEditing', function() {
    if (this.get('isEditing')) {
      this.set('editCategory', getCategoryFromSubjectId(this.get('editEntity.mainSubject.id')));
    }
  })

});
