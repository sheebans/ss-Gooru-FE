import Ember from 'ember';

export default Ember.Route.extend({

  queryParams: {
    courseId:{}
  },

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Session} current session
   */
  session: Ember.inject.service("session"),

  collectionService: Ember.inject.service('api-sdk/collection'),

  courseService: Ember.inject.service('api-sdk/course'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    var collection = this.get('collectionService').readCollection(params.collectionId);

    var course = null;

    if(params.courseId){
      course = this.get('courseService').fetchById(params.courseId);
    }
    return Ember.RSVP.hash({
      collection: collection,
      course:course
    });
  },

  setupController(controller, model) {

    controller.set('collection', model.collection);
    controller.set('course', model.course);
  }

});
