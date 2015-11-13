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
    setEmotion: function(newEmotion) {
      this.$("." + newEmotion).parent().siblings().find(".active").removeClass("active");
      this.$("." + newEmotion).toggleClass("active");
      if(!this.get('selectedEmotion') || this.get('selectedEmotion') !== newEmotion){
        this.set('selectedEmotion', newEmotion);
      }else{
        this.set('selectedEmotion', null);
      }
      this.sendAction("onChangeEmotion", this.get('selectedEmotion'));
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * Add tooltip to UI elements (elements with attribute 'data-toggle')
   */
  addTooltip: function() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  }.on('didInsertElement'),

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
      'icon-class': 'need-help'
    },
    {
      'emotion': 'do-not-understand',
      'icon-class': 'do-not-understand'
    },
    {
      'emotion': 'meh',
      'icon-class': 'meh'
    },
    {
      'emotion': 'understand',
      'icon-class': 'understand'
    },
    {
      'emotion': 'can-explain',
      'icon-class': 'can-explain'
    }],

  /**
   * @property {String|Function} onChangeEmotion - event handler for when the selected emotion is changed
   */
  onChangeEmotion: null,

  /**
   * @property {?string} selectedEmotion - selected emotion
   */
  selectedEmotion: null

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
