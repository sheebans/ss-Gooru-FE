import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

/**
 * Accordion Unit
 *
 * Component responsible for behaving as an accordion and listing a set of lessons.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Course}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion-unit', 'panel', 'panel-default'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Load data for the unit
     *
     * @function actions:loadData
     * @returns {undefined}
     */
    loadData: function() {
      // Loading of data will only happen if 'items' has not previously been set
      if (!this.get('items')) {
        var itemsPromise = this.getLessons();
        this.set('items', itemsPromise);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events
  setupSubscriptions: Ember.on('didInsertElement', function() {

    this.$().on('hide.bs.collapse', function(e) {
      e.stopPropagation();
      $(this).removeClass('expanded');
    });

    this.$().on('show.bs.collapse', function(e) {
      e.stopPropagation();
      $(this).addClass('expanded');
    });
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function() {
    this.$().off('hide.bs.collapse');
    this.$().off('show.bs.collapse');
  }),

  // -------------------------------------------------------------------------
  // Properties


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get all the lessons for the unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getLessons: function() {
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');
    const unitId = this.get('model.id');

    return this.get("lessonService").findByClassAndCourseAndUnit(classId, courseId, unitId);
  }

});
