import Ember from 'ember';

/**
 * This mixin is only used by the assessment report question components
 * It has the default definition and convenience methods for all question types
 * @see reports/assessment/questions/gru-multiple-choice.js
 */
export default Ember.Mixin.create({

  // -------------------------------------------------------------------------
  // Properties
  /**
   * Question information
   * @property {Resource} question
   */
  question: null,

  /**
   * @property {*} selected user answer
   */
  userAnswer: null,

  /**
   * @property {boolean} indicates if it should display the correct question answer
   */
  showCorrect: null,

  /**
   * @property {boolean} indicates if it is in anonymous mode
   */
  anonymous: null,

  // -------------------------------------------------------------------------
  // Methods
  /**
   * Returns the question util for the question
   * @param question
   */
  getQuestionUtil: function(question){
    Ember.Logger.warn("This should be implement by each question type", question);
  }


});
