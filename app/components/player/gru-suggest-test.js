import Ember from 'ember';

export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Attributes
  classNames: ['player','gru-suggest-test'],

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Suggestion type
   * @param {String} (pre-test/post-test)
   */
  type:''
});
