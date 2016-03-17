import Ember from 'ember';
import Course from 'gooru-web/models/content/course';
import { COURSE_CATEGORIES } from 'gooru-web/config/config';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} User service API SDK
   */
  courseService: Ember.inject.service("api-sdk/course"),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'modals', 'gru-course-new'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    selectCategory: function (categoryValue) {
      this.set('course.category', categoryValue);
    },

    createCourse: function () {
      const course = this.get('course');
      course.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {

          this.get("courseService")
            .create(course)
            .then(function (course) {
                this.triggerAction({
                  action: 'closeModal'
                });
                this.get('router').transitionTo('content.courses.edit', course.get('id'));

              }.bind(this),

              function () {
                const message = this.get('i18n').t('common.errors.course-not-created').string;
                this.get('notifications').error(message);
              }.bind(this)
            );
        }
        this.set('didValidate', true);
      }.bind(this));
    }

  },

  // -------------------------------------------------------------------------
  // Events

  init() {
    this._super(...arguments);
    var course = Course.create(Ember.getOwner(this).ownerInjection(), {title: null});
    this.set('course', course);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Ember.A} categories - List of course categories
   */
  categories: COURSE_CATEGORIES,

  /**
   * @type {?String} specific class
   */
  'component-class': null,

  /**
   * @type {Course} course
   */
  course: null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null

});
