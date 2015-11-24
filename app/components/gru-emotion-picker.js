import Ember from 'ember';

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
     * @param {string} newEmotion - newly selected emotion
     * @returns {undefined}
     */
    setEmotion: function(newEmotion, score) {
      if (this.get('selectedEmotion') && this.get('selectedEmotion') == newEmotion) {
        // Do nothing in this case
      } else {
        this.set('ratingScore', score);
        this.sendAction("onChangeEmotion", this.get('selectedEmotionScore'));
      }
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Overwrites didInsertElement hook.
   */
  didInsertElement: function() {
    var component = this;
    // Adds tooltip to UI elements (elements with attribute 'data-toggle')
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});

    // Sets the emotion icon if there is a score for this resource
    this.ratingScoreChanged();
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * List of emotions to be displayed by the component
   *
   * @constant {Array}
   */
  emotionsList: [
    {
      'emotion': 'need-help',
      'icon-class': 'need-help',
      'score': '1'
    },
    {
      'emotion': 'do-not-understand',
      'icon-class': 'do-not-understand',
      'score': '2'
    },
    {
      'emotion': 'meh',
      'icon-class': 'meh',
      'score': '3'
    },
    {
      'emotion': 'understand',
      'icon-class': 'understand',
      'score': '4'
    },
    {
      'emotion': 'can-explain',
      'icon-class': 'can-explain',
      'score': '5'
    }],

  /**
   * @property {String|Function} onChangeEmotion - event handler for when the selected emotion is changed
   */
  onChangeEmotion: null,

  /**
   * @property {?string} selectedEmotion - selected emotion
   */
  selectedEmotion: null,

  /**
   * @property {?string} selectedEmotionScore - selected emotion score
   */
  selectedEmotionScore: null,

  /**
   * @property {number} The emotion score that will be selected
   */
  ratingScore: 0,

  // -------------------------------------------------------------------------
  // Observers

  ratingScoreChanged: function() {
    this.cleanupEmotions();
    var score = this.get('ratingScore');
    if (score > 0) {
      var emotion = this.get('emotionsList')[score - 1].emotion;
      this.selectEmotion(emotion, score);
    }
  }.observes("ratingScore"),

  // -------------------------------------------------------------------------
  // Methods

  cleanupEmotions: function() {
    this.$(".emotions-list li").find(".active").removeClass("active");
    this.set('selectedEmotion', null);
    this.set('selectedEmotionScore', 0);
  },

  selectEmotion: function(emotion, score) {
    this.set('selectedEmotion', emotion);
    this.set('selectedEmotionScore', score);
    this.$("." + emotion).toggleClass("active");
  }

});
