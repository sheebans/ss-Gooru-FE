import Ember from 'ember';
import PlayerController from 'gooru-web/controllers/player';
import {truncate} from 'gooru-web/utils/utils';
import { ASSESSMENT_SHOW_VALUES } from 'gooru-web/config/config';
import ModalMixin from 'gooru-web/mixins/modal';

/**
 * Context Player Controller
 *
 * @module
 * @augments ember/PlayerController
 */
export default PlayerController.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  realTimeService: Ember.inject.service("api-sdk/real-time"),

  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Handle onSubmitQuestion event from gru-question-viewer
     * @see components/player/gru-question-viewer.js
     * @param {Resource} question
     * @param {QuestionResult} questionResult
     * @param {Ember.RSVP.defer} resolved when all actions are done
     * @param {boolean} continue to next resource
     */
    submitQuestion: function (question, questionResult) {
      const controller = this;
      let showFeedback = controller.get('collection.showFeedback') === ASSESSMENT_SHOW_VALUES.IMMEDIATE;
      let isTeacher = controller.get('isTeacher');
      if(!showFeedback || isTeacher) {
        controller._super(...arguments);
      }
      if(questionResult.get('submittedAnswer')) {
        const next = controller.get('collection').nextResource(question);
        if (next) {
          Ember.$(window).scrollTop(0);
          controller.moveToResource(next);
        } else {
          controller.finishCollection();
        }
      } else {
        controller.finishResourceResult(questionResult).then(function(){
          questionResult.set('submittedAnswer', true);
        });
      }
    },

    /**
     * On navigator remix collection button click
     * @param {Collection} collection
     */
    remixCollection: function (collection) {
      var remixModel = {
        content: collection
      };
      if(collection.get('isCollection')) {
        this.send('showModal', 'content.modals.gru-collection-remix', remixModel);
      } else {
        this.send('showModal', 'content.modals.gru-assessment-remix', remixModel);
      }
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Indicates when the player has context
   * @property {boolean}
   */
  hasContext: true,

  /**
   * Indicates the user's role, could be 'student', 'teacher' or null
   * @property {string}
   */
  role: null,

  /**
   * Indicates if a user is a teacher of the current class
   * @property {isTeacher}
   * @see {Class} class
   * @returns {bool}
   */

  isTeacher: Ember.computed('role', function() {
    return (this.get('role')==='teacher');
  }),

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
   * The original collection to remix in the player
   * @property {Collection} collection
   */
  originalCollection: null,

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
      if (onAir){
        const classId = context.get("classId");
        const collectionId = context.get("collectionId");
        const userId = context.get("userId");
        const realTimeService = controller.get('realTimeService');

        if (context.get("isStartEvent")) {
          realTimeService.notifyAttemptStarted(classId, collectionId, userId);
        }
        else if (context.get("isStopEvent")) {
          realTimeService.notifyAttemptFinished(classId, collectionId, userId);
        }
      }
      return Ember.RSVP.resolve(true); //not waiting for the real time events
    });
  }

});
