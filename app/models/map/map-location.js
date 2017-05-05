import Ember from 'ember';
import { ASSESSMENT_SUB_TYPES } from 'gooru-web/config/config';

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
  hasBackFillSuggestions: Ember.computed('suggestions.[]', function(){
    return this.get('suggestions').filterBy('isBackFill').get('length');
  }),

  /**
   * @property {boolean}
   */
  hasBenchmarkSuggestions: Ember.computed('suggestions.[]', function(){
    return this.get('suggestions').filterBy('isBenchmark').get('length');
  }),

  /**
   * Returns the post test suggestion for this location
   * @property {MapSuggestion}
   */
  postTestSuggestion: Ember.computed('hasPostTestSuggestions', function(){
    return this.get('hasPostTestSuggestions') ? this.getSuggestion(ASSESSMENT_SUB_TYPES.POST_TEST) : undefined;
  }),

  /**
   * Returns the pre test suggestion for this location
   * @property {MapSuggestion}
   */
  preTestSuggestion: Ember.computed('hasPreTestSuggestions', function(){
    return this.get('hasPreTestSuggestions') ? this.getSuggestion(ASSESSMENT_SUB_TYPES.PRE_TEST) : undefined;
  }),

  /**
   * Returns the backfill test suggestion for this location
   * @property {MapSuggestion}
   */
  backFillSuggestion: Ember.computed('hasPostTestSuggestions', function(){
    return this.get('hasBackFillSuggestions') ? this.getSuggestion(ASSESSMENT_SUB_TYPES.BACKFILL) : undefined;
  }),

  /**
   * Returns the pre test suggestion for this location
   * @property {MapSuggestion}
   */
  benchmarkSuggestion: Ember.computed('hasPreTestSuggestions', function(){
    return this.get('hasBenchmarkSuggestions') ? this.getSuggestion(ASSESSMENT_SUB_TYPES.BENCHMARK) : undefined;
  }),

  /**
   * Returns the suggestion by sub type
   * @param {string} subType @see ASSESSMENT_SUB_TYPES
     */
  getSuggestion: function(subType) {
    return this.get('suggestions').findBy('subType', subType);
  }
});

export default MapLocationModel;
