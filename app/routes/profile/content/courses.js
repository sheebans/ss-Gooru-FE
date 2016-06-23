import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Route.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ProfileService} Profile service object
   */
  profileService: Ember.inject.service('api-sdk/profile'),


  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Edit course action, when clicking Edit at the course card
     * @param {Content/Course}
     */
    editCourse: function(course){
      this.transitionTo("content.courses.edit", course.get("id"));
    },

    /**
     * Remix course action, when clicking remix at the course card
     * @param {Content/Course}
     */
    remixCourse: function(course){
      var remixModel = {
        content: course
      };
      this.send('showModal', 'content.modals.gru-course-remix', remixModel);
    }

  },

  // -------------------------------------------------------------------------
  // Methods

  model: function() {
    let profile = this.modelFor('profile').profile;
    let courses = this.get('profileService').getCourses(profile);
    return Ember.RSVP.hash({
      courses: courses
    });
  },

  setupController: function (controller, model) {
    controller.get('profileController').selectMenuItem('content');
    controller.set('courses', model.courses);
  },

  deactivate: function() {
    this.get("controller").resetValues();
  }

});
