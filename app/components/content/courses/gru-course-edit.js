import Ember from 'ember';
import ContentEditMixin from 'gooru-web/mixins/content/edit';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Component.extend(ContentEditMixin,ModalMixin, {

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

  /**
   * @property {MediaService} Media service API SDK
   */
  mediaService: Ember.inject.service("api-sdk/media"),


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
      let component = this;
      var editedCourse = component.get('tempCourse');
      let course = component.get('course');
      editedCourse.validate().then(function ({ validations }) {
        if (validations.get('isValid')) {
          let imageIdPromise = new Ember.RSVP.resolve(editedCourse.get('thumbnailUrl'));
          if (editedCourse.get('thumbnailUrl') && editedCourse.get('thumbnailUrl') !== course.get('thumbnailUrl')) {
            imageIdPromise = component.get('mediaService').uploadContentFile(editedCourse.get('thumbnailUrl'));
          }
          imageIdPromise.then(function (imageId) {
            editedCourse.set('thumbnailUrl', imageId);
            component.get('courseService').updateCourse(editedCourse)

              .then(function () {
                course.merge(editedCourse, ['title', 'isVisibleOnProfile', 'thumbnailUrl', 'description']);
                component.set('isEditing', false);
              })

              .catch(function (error) {
                var message = component.get('i18n').t('common.errors.course-not-updated').string;
                component.get('notifications').error(message);
                Ember.Logger.error(error);
              });
          });
          component.set('didValidate', true);
        }
      });
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
  tempCourse: null,

  /**
   * Object sent to Delete modal
   * @property {Course}
   */
  model: Ember.computed('course', function() {
    const course= this.get('course');
    return {
      model:course,
      type:"Course"
    }
  })


});
