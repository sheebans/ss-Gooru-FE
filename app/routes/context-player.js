import Ember from 'ember';
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


  /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Methods

  model(params) {
    const userId = this.get('session.userId');
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    const collection = this.get('collectionService').findById(collectionId);
    const assessmentResult = this.get("performanceService").findAssessmentResultByCollectionAndStudent(collectionId, userId);
    const lesson = this.get('lessonService').findById(courseId, unitId, lessonId);

    const context = Ember.Object.create({
      courseId: courseId,
      classId: params.classId,
      unitId: unitId,
      lessonId: lessonId,
      collectionId: collectionId,
      resourceId: params.resourceId,
      userId: userId
    });

    return Ember.RSVP.hash({
      context: context,
      collection: collection,
      assessmentResult: assessmentResult,
      lesson: lesson
    });
  },

  setupController(controller, model) {
    // Call parent method
    this._super(...arguments);
    controller.set("lesson", model.lesson);
  }

});
