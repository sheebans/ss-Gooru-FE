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
    changeEmotion: function(emotion) {
      //TODO remove when implement the content player
      console.log(emotion);
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
      this.$( ".hamburger-icon" ).addClass( "hidden" );
      this.$( ".content" ).addClass( "margin-navigator" );
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
  onClosePlayer: "onClosePlayer",

  /**
   * @property {bool} is the navigator open or closed for small or x-small devices?
   */
  isNavigatorOpen: null,

  // -------------------------------------------------------------------------
  // Observers
  updateNavigatorStatus: Ember.observer('isNavigatorOpen', function() {
    if (this.get('isNavigatorOpen')){
      Ember.$( ".gru-navigation .hamburger-icon" ).addClass( "hidden" );
      Ember.$( ".gru-navigation .content" ).addClass( "margin-navigator" );
    }
  })

  // -------------------------------------------------------------------------
  // Methods

});
