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
 * @mixes mixins/content/builder
 * @mixes mixins/modal
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

  classNames: ['content', 'courses', 'gru-accordion', 'gru-accordion-lesson', 'view'],

  tagName: 'li',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    toggle: function () {
      var toggleValue = !this.get('model.isExpanded');

      this.loadData();
      this.set('model.isExpanded', toggleValue);
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
