import Ember from 'ember';

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
    changeEmotion: function(emotionScore) {
      this.sendAction('onChangeEmotion', emotionScore);
    },
    /**
     * Action triggered when the user close the content player
     */
    closePlayer:function(){
      this.sendAction("onClosePlayer");
    },
    /**
     * Action triggered when the user open de navigator panel
     */
    openNavigator:function(){
      this.sendAction("onOpenNavigator");
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} on content player action
   */
  onClosePlayer: 'onClosePlayer',

  /**
   * @property {string} on change emotion action
   */
  onChangeEmotion: 'onChangeEmotion',

  /**
   * @property {number} The rating score for the current resource
   */
  ratingScore: 0

  // -------------------------------------------------------------------------
  // Methods

});
