import Ember from 'ember';
import AccordionMixin from 'gooru-web/mixins/gru-accordion';

/**
 * Content Builder: Accordion Course
 *
 * Component responsible for behaving as an accordion and listing a set of units
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

  classNames: ['content', 'courses', 'gru-accordion', 'gru-accordion-course'],


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * @function actions:selectItem
     * @param {string} collectionId - Identifier for a collection or assessment
     * @see module:app/components/class/overview/gru-accordion-lesson
     */
    selectResource: function (unitId, lessonId, collectionId) {
      // Send the action so that it bubbles up to the route
      this.sendAction('onSelectResource', unitId, lessonId, collectionId);
    }

  },


  // -------------------------------------------------------------------------
  // Events
  setupAccordionCourse: Ember.on('init', function () {
    // Loading of data will only happen if 'items' has not previously been set
    if (!this.get('items')) {
      //var itemsPromise = this.getUnits();
      //this.set('items', itemsPromise);
      this.set('items', null);
    }
  }),


  // -------------------------------------------------------------------------
  // Properties


  // -------------------------------------------------------------------------
  // Methods

  /**
   * TODO: Get all the units for the course
   *
   * @function
   * @requires api-sdk/unit#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getUnits: function () {
    const courseId = this.get('model.id');

    return this.get("lessonService").findByClassAndCourseAndUnit(unitId);
  }


});
