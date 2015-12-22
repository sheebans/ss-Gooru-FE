import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  tagName: 'ul',
  classNames:['gru-performance-summary'],
  selectedOption: null,
  performance:null,
  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  didInsertElement: function(){
    const element = this.$();
    const completionValue = this.get('performance').get('completionValue');
    const scoreValue = this.get('performance').get('score');
    const transform_styles = ['-webkit-transform',
      '-ms-transform',
      'transform'];
    let rotations = this.getRotationValues(scoreValue , completionValue);

    for(let i=transform_styles.length;i>0;i--) {

      element.find('.score .circle .fill, .scoreSummary .circle .mask.full').css(transform_styles[i-1],
        'rotate(' + rotations.scoreRotation + 'deg)');
      element.find('.score .circle .fill.fix').css(transform_styles[i-1],
        'rotate(' + rotations.scoreFixRotation + 'deg)');

      element.find('.completion .circle .fill, .completion .circle .mask.full').css(transform_styles[i-1],
        'rotate(' + rotations.completionRotation + 'deg)');
      element.find('.completion .circle .fill.fix').css(transform_styles[i-1],
        'rotate(' + rotations.completionFixRotation + 'deg)');
    }
    this.$().find('.'+this.get('selectedOption')).addClass('selected');
  },
  // -------------------------------------------------------------------------
  // Properties

  // -------------------------------------------------------------------------
  // Observers
  /**
   * Triggered when we change the selectedOption attribute
   */

  selectedOptionChanged: Ember.observer('selectedOption', function() {
    this.$().find('.selected').removeClass('selected');
    this.$().find('.'+this.get('selectedOption')).addClass('selected');
  }),
  // -------------------------------------------------------------------------
  // Methods
  /**
   * Triggered when we need the value of rotations for a specific completionValue and scoreValue.
   * @param {Number} scoreValue containing the values for the rotations
   * @param {Number} completionValue containing the values for the rotations
   */
  getRotationValues: function(scoreValue,completionValue) {
    const tempScoreRotation = Math.floor(scoreValue*180/100);
    const tempCompletionRotation = Math.floor(completionValue*180/100);

    return {
       scoreRotation : tempScoreRotation,
       scoreFixRotation : tempScoreRotation*2,
       completionRotation : tempCompletionRotation,
       completionFixRotation : tempCompletionRotation*2
    };
  }



});
