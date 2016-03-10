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

  userService: Ember.inject.service("api-sdk/user"),


  // -------------------------------------------------------------------------
  // Actions

  actions: {

    navigateBack: function () {
      window.history.back();
    }

  },


  // -------------------------------------------------------------------------
  // Methods

  beforeModel: function () {
    // TODO: authenticate session with ember-simple-auth, if not send to log in
  },

  model: function (params) {
    const classId = params.classId;
    const collectionId = params.collectionId;
    const members = this.get("userService").findMembersByClass(classId);

    // Get initialization data from analytics
    return this.get('collectionService')
      .findById(collectionId)
      .then(function (collection) {

        return Ember.RSVP.hash({
          routeParams: Ember.Object.create({
            classId: classId,
            collectionId: collectionId
          }),
          collection: collection,
          students: members
        });
      });
  },

  setupController: function (controller, model) {
    // Create an instance of report data to pass to the controller.
    var reportData = ReportData.create({
      students: model.students,
      resources: model.collection.get('resources')
    });

    controller.setProperties({
      routeParams: model.routeParams,
      assessment: model.collection,
      students: model.students
    });

    // Because there's an observer on reportData, it's important set all other controller properties beforehand
    controller.set('reportData', reportData);
  },

  resetController: function (controller) {
    const webSocketClient = controller.get('webSocketClient');
    if (webSocketClient !== null) {
      webSocketClient.disconnect();
    }

    // When exiting, reset the controller values
    controller.setProperties({
      routeParams: null,
      assessment: null,
      students: null,
      reportData: null,
      webSocketClient: null
    });
  }

});
