import Ember from 'ember';
import ReportData from 'gooru-web/models/result/report-data';

/**
 * Route for collection/assessment report
 *
 * Gathers and passes initialization data for class performance
 * from analytics to the controller
 *
 * @module
 * @augments ember/Route
 */
export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  session: Ember.inject.service('session'),

  collectionService: Ember.inject.service('api-sdk/collection'),

  performanceService: Ember.inject.service('api-sdk/performance'),


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    const classModel = this.modelFor('class');
    const courseId = classModel.class.get('course');
    const classId = this.paramsFor('class').classId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;
    const collectionId = params.collectionId;
    const model = this;

    // Get initialization data from analytics
    return this.get('collectionService')
      .findById(collectionId)
      .then(function (collection) {
        var collectionType = collection.get('collectionType');

        return model.get('performanceService')
          .findClassPerformanceByUnitAndLessonAndCollection(classId, courseId, unitId, lessonId, collectionId, collectionType)
          .then(function (UserResourcesResults) {

            return Ember.RSVP.hash({
              routeParams: Ember.Object.create({
                classId: classId,
                collectionId: collectionId
              }),
              collection: collection,
              students: classModel.members,
              userResults: UserResourcesResults
            });
          });
      });
  },

  setupController: function (controller, model) {

    // Create an instance of report data to pass to the controller.
    var reportData = ReportData.create({
      students: model.students,
      resources: model.collection.get('resources')
    });

    // Merge any data from analytics into the report data.
    reportData.merge(model.userResults);

    controller.set('routeParams', model.routeParams);
    controller.set('assessment', model.collection);
    controller.set('students', model.students);
    controller.set('reportData', reportData);
  },

  resetController: function (controller) {
    // When exiting, reset the controller values
    controller.setProperties({
      routeParams: null,
      assessment: null,
      students: null,
      reportData: null
    });
  }

});
