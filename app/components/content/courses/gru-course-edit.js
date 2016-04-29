import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';

export default Ember.Component.extend(ContentEditMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service("api-sdk/course"),


  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['content', 'courses', 'gru-course-edit'],

  tagName: 'article',

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Edit Content
     */
    editContent: function () {
      var courseForEditing = this.get('course').copy();
      this.set('tempCourse', courseForEditing);
      this.set('isEditing', true);
    },

    /**
     * Save Content
     */
    updateContent: function () {
      var editedCourse = this.get('tempCourse');

      editedCourse.validate().then(function ({ validations }) {
        if (validations.get('isValid')) {
          this.get('courseService').updateCourse(editedCourse)

            .then(function () {
              this.get('course').merge(editedCourse, ['title', 'isVisibleOnProfile']);
              this.set('isEditing', false);
            }.bind(this))

            .catch(function (error) {
              var message = this.get('i18n').t('common.errors.course-not-updated').string;
              this.get('notifications').error(message);
              Ember.Logger.error(error);
            }.bind(this));
        }
        this.set('didValidate', true);
      }.bind(this));
    },

    /**
      * Save setting for visibility of collection in profile
      */
    publishToProfile: function(isChecked) {
      var courseForEditing = this.get('course').copy();
      this.set('tempCourse', courseForEditing);
      this.set('tempCourse.isVisibleOnProfile', isChecked);
      this.actions.updateContent.call(this);
    }

  },


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * Course model as instantiated by the route. This is the model used when not editing
   * or after any course changes have been saved.
   * @property {Course}
   */
  course: null,

  /**
   * Copy of the course model used for editing.
   * @property {Course}
   */
  tempCourse: null

});
