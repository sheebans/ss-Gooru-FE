import Ember from 'ember';
import BuilderMixin from 'gooru-web/mixins/content/builder';
import ModalMixin from 'gooru-web/mixins/modal';

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
export default Ember.Component.extend(BuilderMixin, ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:i18n
   */
  i18n: Ember.inject.service(),

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

    cancelEdit: function () {
      if (this.get('model.isNew')) {
        this.get('onCancelAddLesson')(this.get('model'));
      } else {
        this.set('model.isEditing', false);
      }
    },

    edit: function () {
      var lessonForEditing = this.get('lesson').copy();
      this.set('tempLesson', lessonForEditing);
      this.set('model.isEditing', true);
    },

    saveLesson: function () {
      var courseId = this.get('courseId');
      var unitId = this.get('unitId');
      var editedLesson = this.get('tempLesson');
      var lessonService = this.get('lessonService');

      editedLesson.validate().then(function ({ validations }) {
        if (validations.get('isValid')) {
          // Saving an existing lesson or a new lesson (falsey id)?
          let savePromise = editedLesson.get('id') ?
                              lessonService.updateLesson(courseId, unitId, editedLesson) :
                                lessonService.createLesson(courseId, unitId, editedLesson);

          savePromise
            .then(function () {
              this.get('lesson').merge(editedLesson, ['id', 'title']);
              this.set('model.isEditing', false);
            }.bind(this))

            .catch(function (error) {
              var message = this.get('i18n').t('common.errors.lesson-not-created').string;
              this.get('notifications').error(message);
              Ember.Logger.error(error);
            }.bind(this));

        }
        this.set('didValidate', true);
      }.bind(this));
    },

    toggle: function () {
      var toggleValue = !this.get('model.isExpanded');

      this.loadData();
      this.set('model.isExpanded', toggleValue);
    }

  },

  // -------------------------------------------------------------------------
  // Events
  init() {
    this._super(...arguments);

    let courseId = this.get('courseId');
    let unitId = this.get('unitId');
    let lessonId = this.get('lesson.id');
    this.set('newCollectionModel', {
      courseId,
      unitId,
      lessonId,
      associateLesson: true
    });

    if (!this.get('lesson.id')) {
      // If this a new unit, set the tempUnit value so things don't break in edit mode
      let lessonForEditing = this.get('lesson').copy();
      this.set('tempLesson', lessonForEditing);
    }
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @prop {String} courseId - ID of the course this unit belongs to
   */
  courseId: null,

  /**
   * @prop {Boolean} isLoaded - Has the data for the lesson already been loaded
   */
  isLoaded: false,

  /**
   * @prop {Content/Lesson} lesson
   */
  lesson: Ember.computed.alias('model.data'),

  /**
   * @prop {Object} newCollectionModel - model for the new collection/assessment modals
   */
  newCollectionModel: null,

  /**
   * @prop {Content/Lesson} tempLesson - Temporary lesson model used for editing
   */
  tempLesson: null,

  /**
   * @prop {String} unitId - ID of the unit this lesson belongs to
   */
  unitId: null,


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Load data for the unit
   *
   * @function actions:loadData
   * @returns {undefined}
   */
  loadData: function () {
    if (!this.get('isLoaded')) {
      let courseId = this.get('courseId');
      let unitId = this.get('unitId');
      let lessonId = this.get('lesson.id');

      return this.get('lessonService')
        .fetchById(courseId, unitId, lessonId)
        .then(function (lesson) {
          this.set('model.data', lesson);
          this.set('items', lesson.get('children'));
          this.set('isLoaded', true);
        }.bind(this))

        .catch(function (error) {
          var message = this.get('i18n').t('common.errors.lesson-not-loaded').string;
          this.get('notifications').error(message);
          Ember.Logger.error(error);
        }.bind(this));
    } else {
      return Ember.RSVP.resolve(true);
    }
  }

});
