import Ember from 'ember';
import { EMOTION_VALUES } from "gooru-web/config/config";

/**
 * Emotion picker
 *
 * Component responsible for letting the user select and update an emotion
 * from a predefined list of emotions
 *
 * @module
 * @augments ember/Component
 */
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
     * Set a new emotion as selected and update the component appearance accordingly
     *
     * @function actions:setEmotion
     * @param {string} newEmotionValue - newly selected emotion
     * @returns {undefined}
     */
    setEmotion: function (newEmotionValue) {
      if (!this.get('selectedEmotion') || this.get('selectedEmotion') !== newEmotionValue) {
        this.selectEmotion(newEmotionValue);
        this.sendAction("onChangeEmotion", this.get('selectedEmotion'));
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Overwrites didInsertElement hook.
   */
  didInsertElement: function() {
    const component = this;
    const startEmotion = this.get('startEmotion');

    // Adds tooltip to UI elements (elements with attribute 'data-toggle')
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});

    // Sets the emotion icon if there is a score for this resource
    if (startEmotion) {
      Ember.run.scheduleOnce('afterRender', this, function () {
        this.selectEmotion(startEmotion);
      });
    }
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of emotions to be displayed by the component
   *
   * @constant {Array}
   */
  emotionValues: EMOTION_VALUES,

  /**
   * @property {String|Function} onChangeEmotion - event handler for when the selected emotion is changed
   */
  onChangeEmotion: null,

  /**
   * @property {?string} selectedEmotion - selected emotion
   */
  selectedEmotion: 0,

  /**
   * @property {number} Initial emotion value
   */
  startEmotion: 0,

  // -------------------------------------------------------------------------
  // Methods
  selectEmotion: function (emotionValue) {
    this.$(".emotions-list li").find(".active").removeClass("active");
    this.set('selectedEmotion', 0);

    this.set('selectedEmotion', emotionValue);
    this.$(".emotion-" + emotionValue).toggleClass("active");
  }

});
