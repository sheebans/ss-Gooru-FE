import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  profileService: Ember.inject.service('api-sdk/profile'),

  model: function () {
    const route = this;
    const currentClass = this.modelFor('class').class;
    var coursesPromise = route.get('profileService')
      .readUserProfile(route.get("session.userId"))
        .then(function(profile) {
          return route.get('profileService').getCourses(profile);
        }.bind(route));
    return Ember.RSVP.hash({
      courses:coursesPromise,
      class:currentClass
    });


  },
  setupController: function (controller, model) {
    controller.get('classController').selectMenuItem('overview');
    controller.set('courses', model.courses);
    controller.set('class', model.class);
  },
  testFunction: function(test){
    console.log(test,'test');
  }

});
