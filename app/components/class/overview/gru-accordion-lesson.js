import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

/**
 * Accordion Lesson
 *
 * Component responsible for behaving as an accordion and listing a set of collections/assessments.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Unit}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(AccordionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-accordion-lesson', 'panel', 'panel-default'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Load the collections for the lesson
     *
     * @function actions:loadData
     * @returns {undefined}
     */
    loadData: function() {
      if (!this.get('items')) {
        var itemsPromise = this.getCollections();
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
  /**
   * @prop {String} - Id of the unit this lesson belongs to
   */
  unitId: null,


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Get all the collections for the lesson
   *
   * @function
   * @requires api-sdk/collection#findByClassAndCourseAndUnitAndLesson
   * @returns {Ember.RSVP.Promise}
   */
  getCollections: function() {
    const classId = this.get('currentClass.id');
    const courseId = this.get('currentClass.course');
    const unitId = this.get('unitId');
    const lessonId = this.get('model.id');

    return this.get("collectionService").findByClassAndCourseAndUnitAndLesson(classId, courseId, unitId, lessonId);
  }

});
