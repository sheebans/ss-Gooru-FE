import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';

/**
 * Content Builder: Accordion Unit
 *
 * Component responsible for behaving as an accordion and listing a set of lessons.
 * It is meant to be used inside of an {@link ./gru-accordion-course|Accordion Course}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(BuilderMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-accordion', 'gru-accordion-unit'],

  classNameBindings: ['model.isEditing:edit:view'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    add: function () {
      this.get('onExpandUnit')();
      this.set('model.isExpanded', true);
    },

    addLesson: function () {
      Ember.Logger.info('Add new lesson');
    },

    /**
     * Load the data for this unit (data should only be loaded once)
     *
     * @function actions:selectUnit
     */
    cancelEdit: function () {
      if (this.get('model.isNew')) {
        this.get('onCancelAddUnit')(this.get('model'));
      } else {
        // TODO: If the item already exists, set it's 'editing' flag to false
        // and restore its model
        //this.set('model.isEditing', false);
      }
    },

    /**
     * Load the data for this unit (data should only be loaded once)
     *
     * @function actions:selectUnit
     */
    selectUnit: function () {
      this.loadData();
    },

    toggle: function () {
      var toggleValue = !this.get('model.isExpanded');
      this.get('onExpandUnit')();
      this.set('model.isExpanded', toggleValue);
    }

  },

  // -------------------------------------------------------------------------
  // Events
  initData: Ember.on('init', function () {
    this.set('items', Ember.A());
  }),


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {Content/Unit} unit
   */
  unit: Ember.computed.alias('model.data'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load data for the unit
   *
   * @function actions:loadData
   * @returns {undefined}
   */
  loadData: function () {
    // Loading of data will only happen if 'items' has not previously been set
    if (!this.get('items')) {
      var itemsPromise = this.getLessons();
      this.set('items', itemsPromise);
    }
  },

  /**
   * TODO: Get all the lessons for the unit
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getLessons: function () {
    const unitId = this.get('model.id');

    return this.get("lessonService").findByClassAndCourseAndUnit(unitId);
  }

});
