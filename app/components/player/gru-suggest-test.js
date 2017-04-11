import Ember from 'ember';

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
   * @param {String} (pre-test/post-test)
   */
  type:''
});
