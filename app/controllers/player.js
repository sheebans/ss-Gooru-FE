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
     * Action triggered when the user close the content player
     */
    closePlayer:function(){
      window.history.back();
    },

    /**
     * Handle onSubmitQuestion event from gru-question-viewer
     * @see components/player/gru-question-viewer.js
     * @param {Resource} question
     */
    submitQuestion: function(question){
      //todo save
      //todo move to next question
      const controller = this,
        next = controller.get("collection").nextResource(question);
      if (next){
        controller.moveToResource(next);
      }
      //todo: else what if there are no more resources
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
      Ember.$( ".app-container" ).removeClass( "navigator-on" );
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
   * The rating score for the resource
   * @property {number} ratingScore
   */
  ratingScore: 0,

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Moves to resource
   * @param {Resource} resource
   */
  moveToResource: function(resource){
    var controller = this;
    controller.set("resourceId", resource.get("id"));
    controller.set("resource", resource);
    controller.set('ratingScore', 0);

    this.get('ratingService').findRatingForResource(resource.get("id"))
      .then(function (ratingModel) {
        controller.set('ratingScore', ratingModel.get('score'));
      });
  }


});
