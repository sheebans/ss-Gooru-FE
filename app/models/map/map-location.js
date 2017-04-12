import Ember from 'ember';

/**
 * MapLocation model
 * This model represent a location in the course map, a location has a context and could have suggestions
 *
 * @typedef {Object} MapNavigation
 */
const MapLocationModel = Ember.Object.extend({

  /**
   * @property {MapContext} context
   */
  context: null,

  /**
   * @property {MapSuggestion[]} suggestions
   */
  suggestions: null,

  /**
   * @property {boolean}
   */
  hasSuggestions: Ember.computed.bool('suggestions.length'),

  /**
   * @property {boolean}
   */
  hasPreTestSuggestions: Ember.computed('suggestions.[]', function(){
    return this.get('suggestions').filterBy('isPreTest').get('length');
  }),

  /**
   * @property {boolean}
   */
  hasPostTestSuggestions: Ember.computed('suggestions.[]', function(){
    return this.get('suggestions').filterBy('isPostTest').get('length');
  }),

  /**
   * @property {boolean}
   */
  hasBenchmarkSuggestions: Ember.computed('suggestions.[]', function(){
    return this.get('suggestions').filterBy('isBenchmark').get('length');
  })
});

export default MapLocationModel;
