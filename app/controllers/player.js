import Ember from 'ember';
import SessionMixin from '../mixins/session';
import {generateUUID} from 'gooru-web/utils/utils';
/**
 * @module
 * @typedef {Object} PlayerController
 *
 * @augments Ember/Controller
 */
export default Ember.Controller.extend(SessionMixin, {

  // -------------------------------------------------------------------------
  // Dependencies
  queryParams: ['resourceId'],

  /**
   * @dependency {Ember.Service} i18n service
   */
  i18n: Ember.inject.service(),

  /**
   * @dependency {Ember.Service} Service to rate a resource
   */
  ratingService: Ember.inject.service("api-sdk/rating"),

  /**
   * @dependency {Ember.Service} Service to rate a resource
   */
  eventsService: Ember.inject.service("api-sdk/events"),


  // ------------------------------------------------------------------------
  realTimeService: Ember.inject.service("api-sdk/real-time"),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * When clicking at submit all or end
     */
    finishCollection: function(){
      let controller = this;
      controller.finishAssessment();
      //TODO finish collections
    },

    /**
     * When clicking at view report
     */
    viewReport: function(){
      let controller = this;
      controller.set("showReport", true);
    },

    /**
     * Handle onSubmitQuestion event from gru-question-viewer
     * @see components/player/gru-question-viewer.js
     * @param {Resource} question
     * @param {QuestionResult} questionResult
     */
    submitQuestion: function(question, questionResult){
      const controller = this;
      controller.submitQuestionResult(questionResult).then(function(){
        const next = controller.get("collection").nextResource(question);
        if (next){
          controller.moveToResource(next);
        }
        else{
          controller.finishAssessment();
        }
      });
    },

    /**
     * Triggered when a navigator resource is selected
     * @param {Resource} resource
     */
    selectNavigatorItem: function(resource){
      const controller = this;
      controller.moveToResource(resource);
    },

    /**
     * Action triggered when the user open de navigator panel
     */
    openNavigator:function(){
      Ember.$( ".app-container" ).addClass( "navigator-on" );
    },

    /**
     * Action triggered when the user close de navigator panel
     */
    closeNavigator:function(){
      const $appContainer = Ember.$( ".app-container" );
      if ($appContainer.hasClass( "navigator-on" )){
        $appContainer.removeClass( "navigator-on" );
      }
    },

    /**
     * Triggered when an resource emotion is selected
     * @param {string} emotionScore
     */
    changeEmotion: function(emotionScore) {
      this.get('ratingService').rateResource(this.get('resourceId'), emotionScore);
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * It contains information about the context where the player is running
   *
   * @see context-player.js route and controller
   *
   * @property {Context}
   */
  context: null,

  /**
   * Query param
   * @property {string} resourceId
   */
  resourceId: null,

  /**
   * The collection presented in this player
   * @property {Collection} collection
   */
  collection: null,

  /**
   * The resource playing
   * @property {Resource} resource
   */
  resource: null,

  /**
   * The resource result playing
   * @property {ResourceResult}
   */
  resourceResult: null,

  /**
   * @property {boolean} indicates if the answer should be saved
   */
  saveEnabled: true, //TODO save only when logged in

  /**
   * @property {AssessmentResult} assessmentResult
   */
  assessmentResult: null,

  /**
   * Indicates if the report should be displayed
   * @property {boolean} showReport
   */
  showReport: false,

  /**
   * Text used for the back navigation link
   * @property {string}
   */
  backLabel: Ember.computed("collection", function(){
    return this.get("i18n").t("common.back");
  }),
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Moves to resource
   * @param {Resource} resource
   */
  moveToResource: function(resource){
    let controller = this;
    let assessmentResult = this.get("assessmentResult");
    let resourceId = resource.get("id");

    controller.set("showReport", false);
    controller.set("resourceId", resourceId);
    controller.set("resource", resource);

    let resourceResult = assessmentResult.getResultByResourceId(resourceId);

    controller.startResourceResult(resourceResult).then(function(){
      controller.set("resourceResult", resourceResult);
      controller.get('ratingService').findRatingForResource(resource.get("id"))
        .then(function (ratingModel) { //TODO this could not be necessary if the reaction is loaded with the result
          resourceResult.set("reaction", ratingModel.get('score'));
        });
    }); //saves the resource status

  },

  /**
   * Submits a question
   * @param {QuestionResult} questionResult
   * @returns {Promise.<boolean>}
   */
  submitQuestionResult: function(questionResult){
    let controller = this;
    let context = this.get("context");

    //setting submitted at, timeSpent is calculated
    questionResult.set("submittedAt", new Date());
    context.set("eventType", "stop");

    //TODO Remove this example of how to call the notification for RT events.
    //if (questionResult) {
    //  controller.get('realTimeService').notifyResourceResult('class-for-pochita-as-teacher', '522f6827-f7dd-486f-8631-eba497e2d425', '0219090c-abe6-4a09-8c9f-343911f5cd86', questionResult);
    //}

    return controller.saveResourceResult(questionResult, context);
  },

  /**
   * Starts a resource result
   * @param {ResourceResult} resourceResult
   * @returns {Promise.<boolean>}
   */
  startResourceResult: function(resourceResult){
    let controller = this;
    let context = this.get("context");
    //sets startedAt
    if (!resourceResult.get("pending")){ //new attempt
      //todo increase attempt
      resourceResult.set("startedAt", new Date());
      context.set("resourceEventId", generateUUID()); //sets the new event id for this resource event
    }
    context.set("eventType", "start");

    return controller.saveResourceResult(resourceResult, context);
  },

  /**
   * Saves the resource result
   * @param resourceResult
   * @returns {Promise.<boolean>}
   */
  saveResourceResult: function(resourceResult, context){
    let controller = this;
    let promise = Ember.RSVP.resolve(resourceResult);
    let save = controller.get("saveEnabled");
    if (save){
       //TODO: implement
       //let onAir = this.get("onAir");
       //let submitted;
       promise = this.get('eventsService').saveResourceResult(resourceResult, context).then(function(){
         /*
         if (onAir){
         return eventsService.notifyResourceResult(resourceResult);
         }*/
         return resourceResult;
       });

    }
    return promise;
  },

  /**
   * Finishes the assessment
   */
  finishAssessment: function(){
    let controller = this;
    let assessmentResult = controller.get("assessmentResult");
    let context = controller.get("context");
    return controller.submitPendingQuestionResults().then(function(){
       //TODO: implement
       //let onAir = this.get("onAir");
       //return controller.get('eventsService').saveCollectionResult(collection).then(function(){
       //if (onAir){
       //return realTimeService.notifyFinishCollection(collection);
       //}
       //});
      context.set("eventType", "stop");
      return controller.get('eventsService').saveCollectionResult(assessmentResult, context).then(function() {
        assessmentResult.set("submittedAt", new Date());
        controller.set("showReport", true);
      });
    });
  },

  /**
   * Starts the assessment
   */
  startAssessment: function(){
    let controller = this;
    let assessmentResult = controller.get("assessmentResult");
    let context = controller.get("context");
    let promise = Ember.RSVP.resolve(controller.get("collection"));

    if (!assessmentResult.get("started")){

       //TODO: implement
       //let onAir = this.get("onAir");
       //promise = this.get('eventsService').saveCollectionResult(collection, context).then(function(){
       //if (onAir){
       //return realTimeService.notifyStartCollection(collection);
       //}
       //});
      assessmentResult.set("startedAt", new Date());
      context.set("eventType", "start");
      return controller.get('eventsService').saveCollectionResult(assessmentResult, context);
      //return promise;
    }
    return promise;
  },



  /**
   * Submits pending question results
   * @returns {Promise}
   */
  submitPendingQuestionResults: function(){
    let controller = this;
    let pendingQuestionResults = this.get("assessmentResult.pendingQuestionResults");
    let promises = pendingQuestionResults.map(function(questionResult){
      return controller.submitQuestionResult(questionResult);
    });
    return Ember.RSVP.all(promises);
  }


});
