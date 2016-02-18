import Ember from 'ember';

/**
 * @module
 * @typedef {Object} PlayerController
 *
 * @augments Ember/Controller
 */
export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  queryParams: ['resourceId'],
  //TODO add courseId, unitId, lessonId

  /**
   * @dependency {Ember.Service} Service to rate a resource
   */
  ratingService: Ember.inject.service("api-sdk/rating"),

  // -------------------------------------------------------------------------
  // Attributes


  // -------------------------------------------------------------------------
  // Actions
  actions: {

    /**
     * Handle onSubmitQuestion event from gru-question-viewer
     * @see components/player/gru-question-viewer.js
     * @param {Resource} question
     * @param {QuestionResult} questionResult
     */
    submitQuestion: function(question, questionResult){
      const controller = this;
      controller.submitQuestionResult(questionResult).then(function(){
        console.debug(questionResult);
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
     * Triggered when a navigator item is selected
     * @param {Resource} item
     */
    selectNavigatorItem: function(item){
      const controller = this;
      controller.moveToResource(item);
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
    //setting submitted at, timeSpent is calculated
    questionResult.set("submittedAt", new Date());

    let save = controller.get("saveEnabled");
    if (save){
      return controller.saveResourceResult(questionResult);
    }

    return Ember.RSVP.resolve(true);
  },

  /**
   * Starts a resource result
   * @param {ResourceResult} resourceResult
   * @returns {Promise.<boolean>}
   */
  startResourceResult: function(resourceResult){
    let controller = this;
    //sets startedAt
    resourceResult.set("startedAt", new Date());

    let save = controller.get("saveEnabled");
    if (save){
      return controller.saveResourceResult(resourceResult);
    }

    return Ember.RSVP.resolve(true);
  },

  /**
   * Saves the resource result
   * @param resourceResult
   * @returns {Promise.<boolean>}
   */
  saveResourceResult: function(resourceResult){
    /*
      TODO: implement
      let onAir = this.get("onAir");
      let submitted
      return analyticsService.saveResourceResult(resourceResult).then(function(){
          if (onAir){
            return realTimeService.notifyResourceResult(resourceResult);
          }
      });
     */
    return Ember.RSVP.resolve(resourceResult);
  },

  /**
   * Finishes the assessment
   */
  finishAssessment: function(){
    return this.submitPendingQuestions().then(function(){
      /*
       TODO: implement
       let onAir = this.get("onAir");
       return analyticsService.finishCollection(collection).then(function(){
       if (onAir){
       return realTimeService.notifyFinishCollection(collection);
       }
       });
       */
      return Ember.RSVP.resolve(this.get("collection"));
    });
  },

  /**
   * Starts the assessment
   */
  startAssessment: function(){
    /*
     TODO: implement
     let onAir = this.get("onAir");
     return analyticsService.startCollection(collection).then(function(){
     if (onAir){
      return realTimeService.notifyStartCollection(collection);
     }
     });
     */
    return Ember.RSVP.resolve(this.get("collection"));
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
