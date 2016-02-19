import Ember from 'ember';
import AssessmentResult from 'gooru-web/models/result/assessment';
import PlayerRoute from 'gooru-web/routes/player';

/**
 * Context Player Route
 *
 * The context player route extends the player route to provide the context player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @augments ember/PlayerRoute
 */
export default PlayerRoute.extend({

  // -------------------------------------------------------------------------
  // Methods

  model(params) {
    const userId = this.get('session.userId');
    const collectionId = params.collectionId;

    const collection = this.get('collectionService').findById(collectionId);
    const assessmentResult = this.get("performanceService").findAssessmentResultByCollectionAndStudent(collectionId, userId);

    return Ember.RSVP.hash({
      routeParams: Ember.Object.create({
        courseId: params.courseId,
        classId: params.classId,
        unitId: params.unitId,
        lessonId: params.lessonId,
        collectionId: collectionId,
        resourceId: params.resourceId
      }),
      collection: collection,
      assessmentResult: assessmentResult
    });
  },

  setupController(controller, model) {
    // Call parent method
    this._super(...arguments);
    controller.set("routeParams", model.routeParams);
  }

});
