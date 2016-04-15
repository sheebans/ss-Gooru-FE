import Ember from 'ember';


export default Ember.Route.extend({

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
  }

});
