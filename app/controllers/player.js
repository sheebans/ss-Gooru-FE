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
      Ember.$( ".gru-navigation .hamburger-icon" ).addClass( "hidden" );
      Ember.$( ".gru-navigation .content" ).addClass( "margin-navigator" );
    },

    /**
     * Action triggered when the user close de navigator panel
     */
    closeNavigator:function(){
      Ember.$( ".app-container" ).removeClass( "navigator-on" );
      Ember.$( ".gru-navigation .hamburger-icon" ).removeClass( "hidden" );
      Ember.$( ".gru-navigation .content" ).removeClass( "margin-navigator" );
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

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Moves to resource
   * @param {Resource} resource
   */
  moveToResource: function(resource){
    this.set("resourceId", resource.get("id"));
    this.set("resource", resource);
  }


});
