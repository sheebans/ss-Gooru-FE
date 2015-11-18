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
     * @param {Question} question
     */
    submitQuestion: function(question){
      console.debug(question);
      //todo save
      //todo move to next question
    },

    /**
     * Triggered when a navigator item is selected
     * @param {Resource} item
     */
    selectNavigatorItem: function(item){
      this.set("resourceId", item.get("id"));
      this.set("resource", item);
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
  resource: null

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods


});
