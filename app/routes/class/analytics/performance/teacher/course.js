import Ember from 'ember';

import { createDataMatrix } from 'gooru-web/utils/performance-data';

/**
 * Teacher Analytics Performance Route - Course Level
 *
 * Route responsible of the transitions and loading the model/data for the teacher class performance at course level
 *
 * @module
 * @augments ember/Controller
 */
export default Ember.Route.extend({
  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {UnitService}
   */
  unitService: Ember.inject.service('api-sdk/unit'),

  /**
   * @type {PerformanceService}
   */
  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * navigateToUnits
    */
    navigateToUnits: function(unitId){
      this.transitionTo('class.analytics.performance.teacher.unit', unitId);
    }
  },

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function() {

    const classModel = this.modelFor('class');
    const classId= this.paramsFor('class').classId;
    const courseId = classModel.course.get("id");
    const users = classModel.members;

    const headers = this.get('unitService').findByClassAndCourse(classId, courseId);
    const classPerformanceData = this.get('performanceService').findClassPerformance(classId, courseId, users);

    return Ember.RSVP.hash({
      headers: headers,
      classPerformanceData: classPerformanceData
    });

  },
  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    const performanceData = createDataMatrix(model.headers, model.classPerformanceData);
    controller.set('performanceDataMatrix', performanceData);
    controller.set('headers', model.headers);
    //updating breadcrumb when navigating back to course
    controller.get("teacherController").updateBreadcrumb(controller.get("course"), "course");
  }

});
