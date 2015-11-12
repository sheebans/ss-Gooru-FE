import Ember from 'ember';
import {emotions} from '../utils/constants';

export default Ember.Component.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  classNames: ['gru-emotion-picker'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {
    /**
     * Triggered when change the emotion
     * @param newEmotion
     */
    onSetEmotion: function(newEmotion) {
      this.$("." + newEmotion).parent().siblings().find(".active").removeClass("active");
      this.$("."+newEmotion).toggleClass("active");
      if(!this.get('selectedEmotion') || this.get('selectedEmotion')!== newEmotion){
        this.set('selectedEmotion',newEmotion);
      }else{
        this.set('selectedEmotion',null);
      }
      this.sendAction("onChangeEmotionAction", this.get('selectedEmotion'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  addTooltip: function() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  }.on('didInsertElement'),

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of emotions
   * @property {array}
   */
  emotionsList :emotions(),

  /**
   * This is triggered when the emotion change
   * @property {string} on selection action
   */
  onChangeEmotionAction: null,

  /**
   * Selected Emotion
   * @property {string}
   */
  selectedEmotion: null

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
