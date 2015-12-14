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
  model: function(params) {
    const route = this;
    const userId = route.get("session.userId");
    const courseId = this.modelFor('class').class.get("course");
    const classId= this.paramsFor('class').classId;


    console.log(this.get("performanceService").findStudentPerformanceByClassAndCourse(userId,classId,courseId));
    return this.get("performanceService").findStudentPerformanceByClassAndCourse(userId,classId,courseId);

  }

});
