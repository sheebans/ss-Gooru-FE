import Ember from 'ember';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';
import { getCategoryFromSubjectId } from 'gooru-web/utils/taxonomy';
import TaxonomyTagData from 'gooru-web/models/taxonomy/taxonomy-tag-data';

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
      this.get('editEntity').set('mainSubject', null);
      this.set('secondarySubject', null);
      this.setLists();
    },
    /**
     * Set Subject
     */
    setSubject(subject, isPrimary) {
      if (isPrimary) {
        this.get('editEntity').set('mainSubject', subject);
      } else {
        this.set('secondarySubject', subject);
      }
    },

    /**
     * Select a subject course
     */
    selectSubjectCourse(course) {
      let subject = this.get('selectedSubject');
      const taxonomyTagData = TaxonomyTagData.create({
        id: course.get('id'),
        code: course.get('code'),
        title: course.get('title'),
        parentTitle: subject.get('subjectTitle'),
        frameworkCode: subject.get('frameworkId')
      });
      this.get("editEntity").addRemoveTaxonomyTagData(taxonomyTagData);
    },

    /**
     * Remove a specific tag
     */
    removeTag(tag) {
      this.get("editEntity").removeTaxonomyTagData(tag.get("data.id"));
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
  // Events

  didInsertElement() {
    this.$().on('click', 'ul.courses li', function(e) {
      e.stopPropagation();
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

  /**
   * the subject selected
   * @property {TaxonomyRoot}
   */
  selectedSubject: Ember.computed.alias("editEntity.mainSubject"),

  /**
   * the subject courses to present
   * @property {[]}
   */
  subjectCourses: Ember.computed.alias("selectedSubject.courses"),


  // -------------------------------------------------------------------------
  // Observers

  /**
   * Sets the corresponding lists of subjects and courses when the primary subject changes
   */
  onSelectedSubjectChanged: Ember.observer('selectedSubject', function() {
    const component = this;
    const subject = component.get('selectedSubject');
    const category = Ember.A(TAXONOMY_CATEGORIES).findBy("apiCode", subject.get("category")).value;
    component.set('editCategory', category);
    component.get('taxonomyService').getSubjects(category).then(function(subjects) {
      component.set('subjectList', subjects);
    });
    if (subject) {
      if (!subject.get('courses') || subject.get('courses').length === 0) {
        component.get('taxonomyService').retrieveSubjectCourses(subject);
      }
    }
  })
});
