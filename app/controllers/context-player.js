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
  // Actions
  actions: {
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates when the player has context
   * @property {boolean}
   */
  hasContext: true,

  /**
   * Should resource navigation in the player be disabled?
   * @property {Lesson}
   */
  isNavigationDisabled: Ember.computed('collection.bidirectional', function() {
    var isDisabled = false;
    if (this.get('collection.isAssessment')) {
      isDisabled = !this.get('collection.bidirectional');
    }
    return isDisabled;
  }),

  isAssessment: false,

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
   * Context class
   * @property {Class}
   */
  class: null,

  /**
   * Indicates if the student is playing the collection
   * @property {boolean}
   */
  isStudent: Ember.computed.not("isTeacher"),

  /**
   * Indicates if the teacher is playing this collection
   * @property {boolean}
   */
  isTeacher: Ember.computed("class", function(){
    const aClass = this.get("class");
    return aClass.isTeacher(this.get("context.userId"));
  }),

  /**
   * Saves the resource result
   * @param {ResourceResult} resourceResult
   * @param {Context} context
   * @param {string} eventType start|stop
   * @param {boolean} isSkip
   * @returns {Promise.<boolean>}
   */
  saveResourceResult: function(resourceResult, context, eventType, isSkip = false) {
    let controller = this;
    let isTeacher = controller.get('isTeacher');
    let promise = controller._super(...arguments);
    let onAir = controller.get('onAir');

    return promise.then(function() {
      if (onAir){
        const classId = context.get('classId');
        const collectionId = context.get('collectionId');
        const userId = context.get('userId');
        const realTimeService = controller.get('realTimeService');

        // Only notifies to the RealTime server when it is a student stop event and the resource is not skipped.
        // RealTime only processes completed resources (questions) due that it has a finish collection event to
        // handle all the skipped resources. Sending multiple concurrent stop events for non-completed resources
        // for the same student will provoke data overwrite issue in the RealTime server.
        if (!isTeacher && (eventType === 'stop') && !isSkip) {
          realTimeService.notifyResourceResult(classId, collectionId, userId, resourceResult);
          controller.set("notifyingRealTime", true);
        }
      }
      return Ember.RSVP.resolve(true); //not waiting for the real time events
    });
  },

  /**
   * Saves an assessment result event
   * This method is overridden by context-player controller to communicate with analytics
   * @param {AssessmentResult} assessmentResult
   * @param {Context} context
   * @param {string} eventType start|stop
   */
  saveCollectionResult: function(assessmentResult, context, eventType){
    const controller = this;
    let isTeacher = controller.get('isTeacher');
    const promise = this._super(...arguments);
    const onAir = controller.get("onAir");
    return promise.then(function(){
      if (onAir){
        const classId = context.get("classId");
        const collectionId = context.get("collectionId");
        const userId = context.get("userId");
        const realTimeService = controller.get('realTimeService');

        if (!isTeacher && (eventType === "start")) {
          realTimeService.notifyAttemptStarted(classId, collectionId, userId);
          controller.set("notifyingRealTime", true);
        }
        else if (!isTeacher && (eventType === "stop")) {
          realTimeService.notifyAttemptFinished(classId, collectionId, userId);
          controller.set("notifyingRealTime", true);
        }
      }
      return Ember.RSVP.resolve(true); //not waiting for the real time events
    });
  }
});
