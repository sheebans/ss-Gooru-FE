import Ember from 'ember';
/**
 * Teacher Scale Indicator
 *
 * Component responsible for showing the Performance Scale Indicator in the teacher page.
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  selectedOption: null,
  lesson:null,
  index:null,
  userId:'',
  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  tagName:'ul',

  // -------------------------------------------------------------------------

  // Methods


  setLessonBreadcrumb:null
});
