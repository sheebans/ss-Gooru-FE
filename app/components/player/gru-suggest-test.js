import Ember from 'ember';
import { SUGGESTION_TYPE } from 'gooru-web/config/config';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['player','gru-suggest-test'],

  actions:{
    playCollection:function(){
      this.sendAction('onPlayCollection');
    }
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * Suggestion type
   * @param {String} (pre-test/post-test/backfill-pretest)
   */
  type:'',
  /**
   * Indicate if the suggestion is a back fill after a pre test
   * @param {Boolean} isBackFill
   */
  isBackFill: Ember.computed.equal('type', SUGGESTION_TYPE.backFill),
  /**
   * Suggested assessment
   * @param {Assessment} assessment
   */
  assessment:null,

  /**
   * @property {Number} Resource count
   */
  resourceCount: Ember.computed('assessment.resources', function() {
   return this.get('assessment.resources').filter(item => item.get('isResource')).length;
  }),

  /**
   * @property {Number} Question count
   */
  questionCount: Ember.computed('assessment.resources', function() {
    return this.get('assessment.resources').filter(item => !item.get('isResource')).length;
  })
});
