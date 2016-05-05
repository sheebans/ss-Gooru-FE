import Ember from 'ember';

/**
 * @typedef {Object} Answer
 */
export default Ember.Object.extend({

  /**
   * @property {string}
   */
  text: null,

  /**
   * @property {string}
   */
  answerType: null,

  /**
   * @property {string}
   */
  order: null,

  /**
   * @property {string}
   */
  isCorrect: null
});
