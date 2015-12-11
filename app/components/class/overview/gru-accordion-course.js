import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

/**
 * Accordion Course
 *
 * Component responsible for behaving as an accordion and listing a set of units.
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/unit
   */
  unitService: Ember.inject.service("api-sdk/unit"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion gru-accordion-course'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events
  setupAccordionCourse: Ember.on('init', function() {
    // Load the units when the component is instantiated
    var itemsPromise = this.getUnits();
    this.set('items', itemsPromise);
  }),

  // -------------------------------------------------------------------------
  // Properties


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Get all the units in a course
   *
   * @function
   * @requires api-sdk/unit#findByClassAndCourse
   * @returns {Ember.RSVP.Promise}
   */
  getUnits: function() {
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');

    return this.get("unitService").findByClassAndCourse(classId, courseId);
  }

});
