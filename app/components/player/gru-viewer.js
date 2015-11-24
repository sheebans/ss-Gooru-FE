import Ember from "ember";

/**
 * Player viewer
 *
 * Component responsible for showing the appropriate content viewer per content type
 * (i.e. question, pdf file, video, etc.).
 *
 * @module
 * @see controllers/player.js
 * @augments ember/Component
 */
export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-viewer'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /***
     * When the user submits the question
     * @param {Question} question
     * @returns {boolean}
     */
    submitQuestion: function(question){
      this.sendAction("onSubmitQuestion", question);
    }
  },


  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties
  /**
   * The resource playing
   * @property {Resource} resource
   */
  resource: null,

  /**
   * The collection playing
   * @property {Collection} collection
   */
  collection: null,

  /**
   * @property {string} on submit question action
   */
  onSubmitQuestion: "submitQuestion"
  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
