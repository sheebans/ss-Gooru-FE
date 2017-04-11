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
  type: null
});

export default MapSuggestionModel;
