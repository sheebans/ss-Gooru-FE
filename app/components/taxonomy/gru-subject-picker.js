import Ember from 'ember';

/**
 * Taxonomy subject picker component
 *
 * Component responsible for displaying subjects
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['taxonomy', 'gru-subject-picker'],

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Set Subject
     */
    setSubject(subject) {
      const component = this;
      component.set('selectedSubject', subject);
      if (component.get("onSubjectSelected")) {
        component.sendAction("onSubjectSelected", subject);
      }
    }
  },

  //
  // Methods

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Array} List of subjects
   */
  subjects: null,

  /**
   * the subject selected
   * @property {TaxonomyRoot}
   */
  selectedSubject: null,

  /**
   * when a subject is selected
   * @property {string}
   */
  onSubjectSelected: null

});
