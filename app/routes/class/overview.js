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

    return  courseId ? this.get("unitService").findByClassAndCourse(classId,courseId): Ember.A();
  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller,model) {
    controller.set("units",model);
    this.send("selectMenuItem", 'overview', false);
  }
});
