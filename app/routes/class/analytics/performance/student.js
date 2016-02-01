import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

/**
 * Student Analytics Performance Route
 *
 * Route responsible of the transitions and loading the model/data for the student performance
 *
 * @module
 * @see routes/analytics/performance/student.js
 * @augments ember/Controller
 */
export default Ember.Route.extend(ApplicationRouteMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  performanceService: Ember.inject.service('api-sdk/performance'),

  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function() {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function() {
    const classModel = this.modelFor('class').class;
    const units = this.modelFor('class').units;
    const userId = this.get('session.userId');
    const classId= classModel.get('id');
    const courseId = classModel.get('course');
    const unitPerformances = this.get('performanceService').findStudentPerformanceByCourse(userId, classId, courseId, units);

    return Ember.RSVP.hash({
      userId:userId,
      classModel:classModel,
      units: units,
      unitPerformances: unitPerformances
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set('performances', model.unitPerformances);
    controller.set('userId', model.userId);
    controller.set('classModel', model.classModel);
    controller.get('classController').selectMenuItem('analytics.performance');
  },

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Action thrown on the model hook when it detects a promise.
     * @param transition - it is the transition promise.
     */
    loading(transition) {
      let controller = this.controllerFor('class');
      controller.set('currentlyLoading', true);
      transition.promise.finally(function() {
        controller.set('currentlyLoading', false);
      });
    },
    /**
     * Open the player with the specific collection/assessment
     *
     * @function actions:playItem
     * @param {string} collectionId - Identifier for a collection or assessment
     */
    playResource: function (collectionId) {
      this.transitionTo('player', collectionId);
    }
  }

});
