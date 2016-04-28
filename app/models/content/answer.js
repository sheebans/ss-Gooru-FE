import Ember from 'ember';

/**
 * Answer model
 * typedef {Object} Answer
 */
const Answer = Ember.Object.extend({

  /**
   * @property {Number} sequence - The order sequence of the answer
   */
  sequence: 0,

  /**
   * @property {Boolean} isCorrect - Indicates if the asnwers if correct or not
   */
  isCorrect: false,

  /**
   * @property {String} text - The answer text
   */
  text: null,

  /**
   * @property {String} type - The answer type
   */
  type: null

});

export default Answer;
