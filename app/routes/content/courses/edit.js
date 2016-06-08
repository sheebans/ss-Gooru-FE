import Ember from 'ember';
import BuilderItem from 'gooru-web/models/content/builder/item';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

export default Ember.Route.extend(PrivateRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:api-sdk/course
   */
  courseService: Ember.inject.service("api-sdk/course"),

  /**
   * @requires service:session
   */
  session: Ember.inject.service("session"),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  model: function (params) {
    var course = this.get('courseService').fetchById(params.courseId);

    return Ember.RSVP.hash({
      course: course
    });
  },

  setupController(controller, model) {
    model.course.children = model.course.children.map(function (unit) {
      // Wrap every unit inside of a builder item
      return BuilderItem.create({
        data: unit
      });
    });

    controller.set('course', model.course);
  }

});
