import Ember from 'ember';

/**
 * MapSuggestion model
 *
 * @typedef {Object} MapSuggestion
 */
const MapSuggestionModel = Ember.Object.extend({

  /**
   * @property {String} id - Suggestion id
   */
  id: null,

  /**
   * @property {String} title
   */
  title: null,

  /**
   * @property {String} type pre-test, post-test, benchmark
   */
  type: null,

  /**
   * @property {boolean}
   */
  isPreTest: Ember.computed.equal('type', 'pre-test'),

  /**
   * @property {boolean}
   */
  isPostTest: Ember.computed.equal('type', 'post-test'),

  /**
   * @property {boolean}
   */
  isBenchmark: Ember.computed.equal('type', 'benchmark')

});

export default MapSuggestionModel;
