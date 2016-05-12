import Ember from 'ember';

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

  classNames: ['content', 'modals', 'gru-course-remix'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    remixCourse: function () {
      const component = this;
      const course = this.get('course');
      course.validate().then(function ({ model, validations }) {
        if (validations.get('isValid')) {
          component.triggerAction({
            action: 'closeModal'
          });
          this.get("courseService")
            .copyCourse(course.get('id'))
            .then(function (courseId) {
                course.set('id', courseId);
                return component.get('courseService').updateCourse(course);
            })
            .then(function() {
                this.get('notifications').setOption('toastClass', 'gooru-toast');
                var successMsg = this.get('i18n').t('common.remix-course-success', {courseTitle: course.get('title')});
                var courseEditUrl = component.get('router').generate('content.courses.edit', course.get('id'));
                this.get('notifications').success(`${successMsg} <a class="btn btn-success" href="${courseEditUrl}">Edit</a>`);
              },
              function () {
                const message = component.get('i18n').t('common.errors.course-not-copied').string;
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
    this.set('course', this.get('model').copy());
    this.get('course').set('title', null);
  },


  // -------------------------------------------------------------------------
  // Properties

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
