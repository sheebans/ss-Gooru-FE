import Ember from "ember";

/**
 * Player navigation
 *
 * Component responsible for showing simple navigation controls (i.e. back/next)
 * for the player. It may embed other components for interacting with the player.
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

  classNames:['gru-navigation'],

  // -------------------------------------------------------------------------
  // Actions
  actions: {
    /**
     * Action triggered when the user change the emotion
     * @see gru-emotion-picker
     */
    onChangeEmotion: function(emotion) {
      //TODO remove when implement the content player
      console.log(emotion);
    }
  }

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
