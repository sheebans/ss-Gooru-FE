import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';

/**
 * Content Builder: Accordion Lesson
 *
 * Component responsible for behaving as an accordion and listing a set of collections/assessments.
 * It is meant to be used inside of an {@link ./gru-accordion-unit|Accordion Unit}
 *
 * @module
 * @augments Ember/Component
 * @mixes mixins/gru-accordion
 */
export default Ember.Component.extend(BuilderMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

  /**
   * @requires service:api-sdk/collection
   */
  collectionService: Ember.inject.service("api-sdk/collection"),

  /**
   * @requires service:api-sdk/lesson
   */
  lessonService: Ember.inject.service("api-sdk/lesson"),

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-accordion', 'gru-accordion-lesson'],

  classNameBindings: ['model.isEditing:edit:view'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    add: function () {
      this.set('model.isExpanded', true);
    },

    addCollection: function () {
      Ember.Logger.info('Add new collection');
    },

    /**
     * Load the data for this unit (data should only be loaded once)
     *
     * @function actions:selectUnit
     */
    cancelEdit: function () {
      if (this.get('model.isNew')) {
        this.get('onCancelAddLesson')(this.get('model'));
      } else {
        // TODO: If the item already exists, set it's 'editing' flag to false
        // and restore its model
        //this.set('model.isEditing', false);
      }
    },

    saveLesson: function () {
      var courseId = this.get('courseId');
      var unit = this.get('unitId');
      var lesson = this.get('lesson');

      this.get('lessonService')
        .createLesson(courseId, unitId, lesson)

        .then(function () {
          this.set('model.isEditing', false);
        }.bind(this))

        .catch(function () {
          var message = this.get('i18n').t('common.errors.lesson-not-created').string;
          this.get('notifications').error(message);
        }.bind(this));
    },

    /**
     * Load the data for this unit (data should only be loaded once)
     *
     * @function actions:selectUnit
     */
    selectLesson: function () {
      this.loadData();
    },

    toggle: function () {
      var toggleValue = !this.get('model.isExpanded');
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
   * @prop {String} courseId - ID of the course this unit belongs to
   */
  courseId: null,

  /**
   * @prop {String} unitId - ID of the unit this lesson belongs to
   */
  unitId: null,

  /**
   * @prop {Content/Unit} unit
   */
  lesson: Ember.computed.alias('model.data'),

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
   * TODO: Get all the collections/assessments for the lesson
   *
   * @function
   * @requires api-sdk/lesson#findByClassAndCourseAndUnit
   * @returns {Ember.RSVP.Promise}
   */
  getCollections: function () {
    const unitId = this.get('model.id');

    return this.get("lessonService").findByClassAndCourseAndUnit(unitId);
  }

});
