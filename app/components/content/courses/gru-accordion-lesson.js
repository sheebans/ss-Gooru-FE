import Ember from 'ember';
import AccordionMixin from '../../../mixins/gru-accordion';

/**
 * Content Builder: Accordion Lesson
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

  classNames: ['content', 'courses', 'gru-accordion', 'gru-accordion-lesson', 'panel', 'panel-default'],

  classNameBindings: ['isExpanded:expanded'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Load the data for this lesson (data should only be loaded once)
     *
     * @function actions:selectLesson
     * @returns {undefined}
     */
    selectLesson: function () {
      this.loadData();
    },

    /**
     * @function actions:selectResource
     * @param {string} collectionId - Identifier for a resource (collection/assessment)
     */
    selectResource: function (collectionId) {
      let lessonId = this.get("model.id");
      this.get('onSelectResource')(lessonId, collectionId);
    }

  },

  // -------------------------------------------------------------------------
  // Events
  setupComponent: Ember.on('didInsertElement', function () {
    const component = this;

    this.$().on('hide.bs.collapse', function (e) {
      e.stopPropagation();
      component.set('isExpanded', false);
    });

    this.$().on('show.bs.collapse', function (e) {
      e.stopPropagation();
      component.set('isExpanded', true);
    });
  }),

  removeSubscriptions: Ember.on('willDestroyElement', function () {
    this.$().off('hide.bs.collapse');
    this.$().off('show.bs.collapse');
  }),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} - Id of the unit this lesson belongs to
   */
  unitId: null,

  /**
   * Contains only visible units
   * @property {Unit[]} units
   */
  collections: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load the collections/assessments for the lesson
   *
   * @function
   * @returns {undefined}
   */
  loadData: function () {
    // Loading of data will only happen if 'items' has not previously been set
    if (!this.get('items')) {
      var itemsPromise = this.getCollections();
      this.set('items', itemsPromise);
    }
  },

  /**
   * TODO: Get all the collections/assessments for the lesson
   *
   * @function
   * @requires api-sdk/collection#
   * @returns {Ember.RSVP.Promise}
   */
  getCollections: function () {
    const lessonId = this.get('model.id');

    return this.get("collectionService").findByClassAndCourseAndUnit(lessonId);
  }

});
