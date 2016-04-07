import Ember from 'ember';


export default Ember.Route.extend({

  /**
   * @type {ProfileService} Profile service object
   */
  profileService: Ember.inject.service('api-sdk/profile'),

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
