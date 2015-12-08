import Ember from 'ember';
import SessionMixin from '../../mixins/session';

export default Ember.Route.extend(SessionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {UserService} Service to retrieve user information
   */
  unitService: Ember.inject.service("api-sdk/unit"),

  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },
  /**
   * Get model for the controller
   */
  model: function() {
    var aClass = this.modelFor('class').class;
    var classId = aClass.get("id");
    var courseId = aClass.get("course");

    // === TODO: Remove this
    var userPerformance = this.get('performanceService')
      .findStudentPerformanceByClassAndCourse(this.get('session.userId'), classId, courseId);
    // ====

    return  courseId ? this.get("unitService").findByClassAndCourse(classId,courseId): Ember.A();
  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller,model) {
    // === TODO: Remove this ===
    var aClass = this.modelFor('class').class;
    var classId = aClass.get("id");
    var courseId = aClass.get("course");

    var unit = model.get('firstObject');
    this.get('performanceService')
      .findStudentPerformanceByClassAndCourseAndUnit(this.get('session.userId'), classId, courseId, unit.get('id'));
    // =====

    controller.set("units",model);
    this.send("selectMenuItem", 'overview', false);
  }
});
