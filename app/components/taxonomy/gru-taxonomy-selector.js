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
      this.set('editEntity.category', categoryValue);
      this.getSubjects(categoryValue);
      this.set('primarySubject', null);
      this.set('secondarySubject', null);
      // TODO: Make sure that all content entities implement the following method
      this.get('editEntity').setTaxonomySubject(null);
    },
    /**
     * Set Subject
     */
    setSubject(subject, isPrimary) {
      if (isPrimary) {
        this.set('primarySubject', subject);
        // TODO: Make sure that all content entities implement the following method
        this.get('editEntity').setTaxonomySubject(subject);
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
    Ember.run.scheduleOnce('afterRender', component, function() {
      component.getSubjects(component.get('srcEntity.category'));
    });
  },

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
  getSubjects(category) {
    var component = this;
    component.get('taxonomyService').getSubjects(category).then(function(subjects) {
      component.set('subjectList', subjects);
    });
  },

  // -------------------------------------------------------------------------
  // Observers

  /**
   * Sets the primary subject based on editEntity subject
   */
  initializePrimarySubject: Ember.observer('isEditing', function() {
    if (!this.get('primarySubject') && this.get('isEditing')) {
      let primarySubject = this.get('taxonomyService').findSubjectById(this.get('editEntity.category'), this.get('editEntity.subject'));
      this.set('primarySubject', primarySubject);
    } else {
      this.set('primarySubject', null);
    }
  })

});
