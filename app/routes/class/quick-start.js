import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  profileService: Ember.inject.service('api-sdk/profile'),

  model: function () {
    const route = this;
    var coursesPromise = route.get('profileService')
      .readUserProfile(route.get("session.userId"))
        .then(function(profile) {
          return route.get('profileService').getCourses(profile);
        });
    return Ember.RSVP.hash({
      courses:coursesPromise
    });
  },

  setupController: function (controller, model) {
    controller.get('classController').selectMenuItem('overview');
    controller.set('class', {
      class: model.class,
      isQuickstart: true
    });
    controller.set('courses', model.courses);
  }

});
