import Ember from 'ember';
import CourseModel from 'gooru-web/models/content/course';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

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
      const component = this;
      const course = this.get('course');
      course.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {

          this.get("courseService")
            .createCourse(course)
            .then(function (course) {
                component.triggerAction({
                  action: 'closeModal'
                });
                component.get('router').transitionTo('content.courses.edit', course.get('id'));
              },
              function () {
                const message = component.get('i18n').t('common.errors.course-not-created').string;
                component.get('notifications').error(message);
              }
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
    var course = CourseModel.create(Ember.getOwner(this).ownerInjection(), {title: null});
    this.set('course', course);
  },


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {Ember.A} categories - List of course categories
   */
  categories: TAXONOMY_CATEGORIES,

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
