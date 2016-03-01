import Ember from 'ember';
import PlayerController from 'gooru-web/controllers/player';
import {truncate} from 'gooru-web/utils/utils';

/**
 * Context Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  realTimeService: Ember.inject.service("api-sdk/real-time"),


  // -------------------------------------------------------------------------
  // Properties
  /**
   * The lesson for this collection
   * @property {Lesson}
   */
  lesson: null,

  /**
   * Indicates if the assessment is onAir, listening for events
   * @property {boolean} onAir
   */
  onAir: false,

  /**
   * Text used for the back navigation link
   * @property {string}
   */
  lessonTitle: Ember.computed("lesson", function(){
    return truncate(this.get("lesson.title"), null, "name");
  }),

  /**
   * Saves the resource result
   * @param resourceResult
   * @returns {Promise.<boolean>}
   */
  saveResourceResult: function(resourceResult, context){
    let controller = this;
    let promise = controller._super(...arguments);
    let onAir = controller.get("onAir");
    return promise.then(function(){
      if (onAir){
        const classId = context.get("classId");
        const collectionId = context.get("collectionId");
        const userId = context.get("userId");
        const realTimeService = controller.get('realTimeService');

        if (context.get("isStopEvent")) { //only notifies when the question is completed
          realTimeService.notifyResourceResult(classId, collectionId, userId, resourceResult);
        }
      }
      return Ember.RSVP.resolve(true); //not waiting for the real time events
    });
  },

  /**
   * Saves an assessment result event
   * This method is overriden by context-player controller to communicate with analytics
   * @param {AssessmentResult} assessmentResult
   * @param {Context} context
   */
  saveCollectionResult: function(assessmentResult, context){
    const controller = this;
    const promise = this._super(assessmentResult, context);
    const onAir = controller.get("onAir");
    return promise.then(function(){
      let notifyPromise = null;
      if (onAir){
        const classId = context.get("classId");
        const collectionId = context.get("collectionId");
        const userId = context.get("userId");
        const realTimeService = controller.get('realTimeService');

        if (context.get("isStartEvent")) {
          notifyPromise = realTimeService.notifyAttemptStarted(classId, collectionId, userId);
        }
        else if (context.get("isStopEvent")) {
          notifyPromise = realTimeService.notifyAttemptFinished(classId, collectionId, userId);
        }
      }
      //return notifyPromise;
      return Ember.RSVP.resolve(true); //not waiting for the real time events
    });
  }

});
