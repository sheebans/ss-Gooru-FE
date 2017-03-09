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
  requiresFeedback: null,

  /**
   * @property {boolean} allowScoring
   */
  allowsScoring: null,

  /**
   * @property {boolean} allowLevel
   */
  allowsLevels: null,

  /**
   * @property {Ember.A} levels { name: string, score: number }
   */
  levels: []

});
