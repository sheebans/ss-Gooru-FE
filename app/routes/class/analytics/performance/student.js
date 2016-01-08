import Ember from 'ember';
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

/**
 * Student Analytics Performance Route
 *
 * Route responsible of the transitions and loading the model/data for the student performance
 *
 * @module
 * @see routes/analytics/performance/student.js
 * @augments ember/Controller
 */
export default Ember.Route.extend(ApplicationRouteMixin,{
  // -------------------------------------------------------------------------
  // Dependencies
  performanceService: Ember.inject.service("api-sdk/performance"),
  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in


  },
  model: function() {
    const route = this;
    const classModel = this.modelFor('class').class;
    const userId = route.get("session.userId");
    const classId= classModel.get("id");
    const courseId = classModel.get("course");
    const performances = this.get("performanceService").findUnitPerformanceByClassAndCourse(userId,classId,courseId);

    return Ember.RSVP.hash({
      userId:userId,
      classModel:classModel,
      performances: performances
    });

  },
  actions: {
    loading(transition) {
      let controller = this.controllerFor('class');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    }
  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("performances", model.performances);
    controller.set("userId", model.userId);
    controller.set("classModel", model.classModel);
    controller.get('classController').selectMenuItem('analytics.performance');
  }
});
