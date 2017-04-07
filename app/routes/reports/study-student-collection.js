import StudentCollection from 'gooru-web/routes/reports/student-collection';

/**
 *
 * Analytics data for a student related to a collection of resources
 * Gathers and passes the necessary information to the controller
 *
 * @module
 * @augments ember/Route
 */
export default StudentCollection.extend({

  templateName: 'reports/study-student-collection',

  // -------------------------------------------------------------------------
  // Methods

  setupController(controller, model) {
    controller.set('collection', model.collection);
    this._super(...arguments);
  }
});
