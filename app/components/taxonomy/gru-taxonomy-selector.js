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
  // Dependencies

  /**
   * @requires service:api-sdk/question
   */
  taxonomyService: Ember.inject.service("api-sdk/taxonomy"),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Set Category
     */
    setCategory(categoryValue) {
      this.set('category', categoryValue);
      this.getSubjects();
      this.set('primarySubject', null);
      this.set('secondarySubject', null);
      // TODO: Make sure that all content entities implement the following method
      this.get('editObject').setTaxonomySubject(null);
    },
    /**
     * Set Subject
     */
    setSubject(subject, isPrimary) {
      if (isPrimary) {
        this.set('primarySubject', subject);
        // TODO: Make sure that all content entities implement the following method
        this.get('editObject').setTaxonomySubject(subject);
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
    var component = this;
    Ember.run.scheduleOnce('afterRender', component, component.getSubjects);
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
   * @type {String} The taxonomy category
   */
  category: null,

  /**
   * @type {Object} The object in edit mode
   */
  editObject: null,

  /**
   * @type {Boolean} Allows the component to display a secondary subject
   */
  enableSecondarySubject: false,

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
  subjectList: null,

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Gets all the subjects for existing categories
   */
  getSubjects() {
    var component = this;
    component.get('taxonomyService').getSubjects(component.get('category')).then(function(subjects) {
      component.set('subjectList', subjects);
    });
  },

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Sets the primary subject based on editObject subject
   */
  initializePrimarySubject: Ember.observer('editObject.subject', function() {
    if (this.get('editObject.subject') && !this.get('primarySubject')) {
      let primarySubject = this.get('taxonomyService').findSubjectById(this.get('category'), this.get('editObject.subject'));
      this.set('primarySubject', primarySubject);
    }
  })

});
