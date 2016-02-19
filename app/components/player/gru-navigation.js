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
     * Action triggered when the user open de navigator panel
     */
    openNavigator:function(){
      this.sendAction("onOpenNavigator");
    },

    /**
     * Action triggered when the user wants to access the report
     */
    viewReport:function(){
      this.sendAction("onViewReport");
    },

    /**
     * Action triggered when the user wants to finish the collection
     */
    finishCollection:function(){
      this.sendAction("onFinishCollection");
    }
  },

  // -------------------------------------------------------------------------
  // Events


  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} on change emotion action
   */
  onChangeEmotion: 'onChangeEmotion',

  /**
   * @property {number} The rating score for the current resource
   */
  ratingScore: 0,

  /**
   * Indicates when the collection is already submitted
   * @property {boolean}
   */
  submitted: false,

  /**
   * Indicates if changes can be made
   * @property {boolean} readOnly
   */
  readOnly: Ember.computed.alias("submitted")

  // -------------------------------------------------------------------------
  // Methods

});
