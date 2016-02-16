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
      let save = this.get("saveEnabled"); //TODO save only if courseId is provided
      //TODO save
      if (save){
        console.debug(question);
        console.debug(questionResult);
      }

      const controller = this;
      const next = controller.get("collection").nextResource(question);

      if (next){
        controller.moveToResource(next);
      }
      else{
        //TODO: submit all
      }
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
   * The rating score for the resource
   * @property {number} ratingScore
   */
  ratingScore: 0,

  /**
   * User resource results
   * @property {UserResourceResult} userResourcesResult
   */
  userResourcesResult: null,

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
    let userResourcesResult = this.get("userResourcesResult");
    let resourceId = resource.get("id");
    controller.set("resourceId", resourceId);
    controller.set("resource", resource);
    controller.set("resourceResult", userResourcesResult.findBy("resourceId", resourceId));
    controller.set('ratingScore', 0);

    this.get('ratingService').findRatingForResource(resource.get("id"))
      .then(function (ratingModel) {
        controller.set('ratingScore', ratingModel.get('score'));
      });
  }


});
