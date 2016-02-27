import Ember from 'ember';
import PlayerRoute from 'gooru-web/routes/player';
import Context from 'gooru-web/models/result/context';
import {generateUUID} from 'gooru-web/utils/utils';


/**
 * Context Player Route
 *
 * The context player route extends the player route to provide the context player
 * controller with additional information available only to signed-in users
 *
 * @module
 * @extends PlayerRoute
 */
export default PlayerRoute.extend({


  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type LessonService
   */
  lessonService: Ember.inject.service('api-sdk/lesson'),

  // -------------------------------------------------------------------------
  // Methods

  model(params) {
    const route = this;
    const userId = route.get('session.userId');
    const hasUserSession = !route.get('session.isAnonymous');

    const resourceId = params.resourceId;
    const collectionId = params.collectionId;
    const courseId = params.courseId;
    const unitId = params.unitId;
    const lessonId = params.lessonId;

    const collectionPromise = route.get('collectionService').findById(collectionId);

    return collectionPromise.then(function(collection){
      const context = Context.create({
        userId: userId,
        collectionId: collectionId,
        parentEventId: generateUUID(), //TODO is this comming from BE?
        collectionType: collection.get("collectionType"),
        courseId: courseId,
        classId: params.classId,
        unitId: unitId,
        lessonId: lessonId
      });

      let lastOpenSessionPromise = !hasUserSession ? Ember.RSVP.resolve(null) : route.get("userSessionService").getOpenSession(context);
      return lastOpenSessionPromise.then(function (lastSession) {
        let assessmentResult = null;

        if (lastSession) {
          assessmentResult = route.get("performanceService").findAssessmentResultByCollectionAndStudent(lastSession.sessionId);
        }

        console.log('result2',assessmentResult);

        const lesson = route.get('lessonService').findById(courseId, unitId, lessonId);
        return Ember.RSVP.hash({
          collection: collection,
          resourceId: resourceId,
          assessmentResult: assessmentResult,
          context: context,
          lesson: lesson
        });
      });
    });
  },

  setupController(controller, model) {
    // Call parent method
    this._super(...arguments);
    controller.set("lesson", model.lesson);
  }

});
