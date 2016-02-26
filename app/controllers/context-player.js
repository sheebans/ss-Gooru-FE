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
  backLabel: Ember.computed("lesson", function(){
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
        let realTimeService = controller.get('realTimeService');
        if (context.get("eventType") === 'stop') { //only notifies when the question is completed
          return realTimeService.notifyResourceResult(context.get("classId"), context.get("collectionId"),
            context.get("userId"), resourceResult);
        }
      }
    });
  },

  /**
   * Saves an assessment result event
   * This method is overriden by context-player controller to communicate with analytics
   * @param {AssessmentResult} assessmentResult
   * @param {Context} context
   */
  saveCollectionResult: function(assessmentResult, context){
    let controller = this;
    let promise = this._super(...arguments);
    let onAir = controller.get("onAir");
    return promise.then(function(){
      if (onAir){
        let realTimeService = controller.get('realTimeService');
        Ember.Logger.debug(assessmentResult, context, realTimeService);
        if (context.get("eventType") === 'start') {

        }
        else if (context.get("eventType") === 'stop') {

        }
      }
    });
  }



});
