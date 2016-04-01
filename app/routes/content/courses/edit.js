import Ember from 'ember';
import Course from 'gooru-web/models/content/course';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  setupController(controller /*, model */) {

    // TODO: Fetch data from model
    var course = Course.create(Ember.getOwner(this).ownerInjection(), {
      title: "Course Title",
      category: 1,
      audience: [2, 4],
      image: '',

      // TODO: Create/use model for units
      units: []
    });

    controller.set('course', course);
  }

});
