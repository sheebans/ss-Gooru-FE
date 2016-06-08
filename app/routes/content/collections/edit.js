import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

export default Ember.Route.extend(PrivateRouteMixin, {

  queryParams: {
    courseId:{},
    allowBackToCourse:{}
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
  // Events
  resetController(controller, isExiting) {
    if (isExiting) {
      controller.set('courseId', undefined);
      controller.set('allowBackToCourse', undefined);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  model: function (params) {
    var collection = this.get('collectionService').readCollection(params.collectionId);
    var course = null;

    if(params.courseId && params.courseId !== "null"){
      course = this.get('courseService').fetchById(params.courseId);
    }
    var allowBackToCourse = params.allowBackToCourse && params.allowBackToCourse === 'true';

    return Ember.RSVP.hash({
      collection: collection,
      course:course,
      allowBackToCourse:allowBackToCourse
    });
  },

  setupController(controller, model) {

    controller.set('collection', model.collection);
    controller.set('course', model.course);
    controller.set('allowBackToCourse',model.allowBackToCourse);
  }

});
