import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes
  tagName: 'ul',
  classNames:['gru-performance-summary', 'row'],

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Events


  didInsertElement: function(){
    const element = this.$();
    const completionValue = this.get('performance').get('completionDone') *100 / this.get('performance').get('completionTotal');
    const transform_styles = ['-webkit-transform',
      '-ms-transform',
      'transform'];
    const scoreRotation = Math.floor(this.get('performance').get('score')*180/100);
    const scoreFixRotation = scoreRotation*2;

    const completionRotation = Math.floor(completionValue*180/100);
    const completionFixRotation  =completionRotation*2 ;

    for(let i=transform_styles.length;i>0;i--) {

      element.find('.scoreSummary .circle .fill, .scoreSummary .circle .mask.full').css(transform_styles[i-1],
        'rotate(' + scoreRotation + 'deg)');
      element.find('.scoreSummary .circle .fill.fix').css(transform_styles[i-1],
        'rotate(' + scoreFixRotation + 'deg)');

      element.find('.completionSummary .circle .fill, .completionSummary .circle .mask.full').css(transform_styles[i-1],
        'rotate(' + completionRotation + 'deg)');
      element.find('.completionSummary .circle .fill.fix').css(transform_styles[i-1],
        'rotate(' + completionFixRotation + 'deg)');
    }


  }
  // -------------------------------------------------------------------------
  // Properties




});
