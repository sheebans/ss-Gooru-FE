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
  eventsService: Ember.inject.service("api-sdk/events"),


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
          Ember.$(window).scrollTop(0);
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
      let resourceResult = this.get('resourceResult');
      this.saveReactionForResource(resourceResult, emotionScore);
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

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Moves to resource
   * @param {Resource} resource
   */
  moveToResource: function(resource) {
    let controller = this;
    let assessmentResult = this.get("assessmentResult");
    let resourceId = resource.get("id");
    let resourceResult = assessmentResult.getResultByResourceId(resourceId);

    controller.startResourceResult(resourceResult).then(function(){
      controller.setProperties({
        "showReport": false,
        "resourceId": resourceId,
        "resource": resource,
        "resourceResult": resourceResult
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
   * This method is overriden by context-player controller to communicate with analytics
   * @param resourceResult
   * @returns {Promise.<boolean>}
   */
  saveResourceResult: function(resourceResult, context){
    let controller = this;
    let promise = Ember.RSVP.resolve(resourceResult);
    let save = controller.get("saveEnabled");
    if (save){
       promise = this.get('eventsService').saveResourceResult(resourceResult, context).then(function(){
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
      context.set("eventType", "stop");
      assessmentResult.set("submittedAt", new Date());
      return controller.saveCollectionResult(assessmentResult, context).then(function() {
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
      assessmentResult.set("startedAt", new Date());
      context.set("eventType", "start");
      return controller.saveCollectionResult(assessmentResult, context);
    }
    return promise;
  },

  /**
   * Saves an assessment result event
   * This method is overriden by context-player controller to communicate with analytics
   * @param {AssessmentResult} assessmentResult
   * @param {Context} context
   */
  saveCollectionResult: function(assessmentResult, context){
    let controller = this;
    return controller.get('eventsService').saveCollectionResult(assessmentResult, context);
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
  },

  saveReactionForResource: function(resourceResult, reactionType) {
    let eventsService = this.get('eventsService');
    let context = this.get('context');
    resourceResult.set('reaction', reactionType);   // Sets the reaction value into the resourceResult

    eventsService.saveReaction(resourceResult, context);
  }


});
