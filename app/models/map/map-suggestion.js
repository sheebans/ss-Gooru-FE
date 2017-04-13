import Ember from 'ember';
import {ASSESSMENT_SUB_TYPES} from 'gooru-web/config/config';
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
   * @property {String} type assessment
   */
  type: null,

  /**
   * @property {String} type pre-test, post-test, benchmark
   */
  subType: null,

  /**
   * @property {boolean}
   */
  isPreTest: Ember.computed.equal('subType', ASSESSMENT_SUB_TYPES.PRE_TEST),

  /**
   * @property {boolean}
   */
  isPostTest: Ember.computed.equal('subType', ASSESSMENT_SUB_TYPES.POST_TEST),

  /**
   * @property {boolean}
   */
  isBenchmark: Ember.computed.equal('subType', ASSESSMENT_SUB_TYPES.BENCHMARK)

});

export default MapSuggestionModel;
