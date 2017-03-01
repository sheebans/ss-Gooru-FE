import Ember from 'ember';

/**
 * Rubric Category model
 *
 * @typedef {Object} RubricCategory
 */
export default Ember.Object.extend({

  /**
   * @property {String} id
   */
  id: null,

  /**
   * @property {String} title
   */
  title: null,

  /**
   * @property {String} narrativeFeedback
   */
  narrativeFeedback: null,

  /**
   * @property {boolean} requiresFeedback
   */
  requireFeedback: null,

  /**
   * @property {boolean} allowScoring
   */
  allowScoring: null,

  /**
   * @property {boolean} allowLevel
   */
  allowLevels: null,

  /**
   * @property {Ember.A} levels { name: string, score: number }
   */
  levels: []

});
