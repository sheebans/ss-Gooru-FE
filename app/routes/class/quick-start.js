import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  profileService: Ember.inject.service('api-sdk/profile'),

  model: function () {
    const route = this;

    var coursesPromise = this.get('profileService')
      .readUserProfile(this.get("session.userId"))
        .then(function(profile) {
          return this.get('profileService').getCourses(profile);
        }.bind(this));


    return Ember.RSVP.hash({
      courses:coursesPromise
    });
  },

  setupController: function (controller, model) {
    controller.get('classController').selectMenuItem('overview');
    controller.set('courses', model.courses);
    console.log(model.courses);
  }

});
