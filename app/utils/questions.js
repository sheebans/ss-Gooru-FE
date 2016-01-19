import Ember from 'ember';

/**
 * Base question util class
 * This utility class defines the basic behavior for all question types
 * it contains convenience methods to grade and retrieve useful information
 * from question types
 *
 * @typedef {Object} QuestionUtil
 */
const QuestionUtil = Ember.Object.extend({

  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {Resource}
   */
  question: null,


  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * This method should be implemented at different question types
   *
   * @param {*} answer user answer
   */
  isCorrect: function(answer){
    Ember.Logger.warning("The method isCorrect is not implemented", answer);
  },

  /**
   * This method should be implemented at different question types
   *
   * @return {*} the correct answer choice id
   */
  getCorrectAnswer: function(){
    Ember.Logger.warning("The method getCorrectAnswer is not implemented");
  }

});


/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleChoiceUtil
 */
const MultipleChoiceUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer is correct
   *
   * @param {*} answer user answer
   * @return {boolean}
   */
  isCorrect: function(answer){
    return this.getCorrectAnswer() === answer;
  },

  /**
   * Gets the correct answer
   *
   * @return {string} the correct answer choice id
   */
  getCorrectAnswer: function(){
    const answers = this.get("question.answers");
    const correctAnswer = answers.filterBy("isCorrect", true);
    return correctAnswer.get("length") ? correctAnswer.get("firstObject.id") : undefined;
  }


});

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleAnswerUtil
 */
const MultipleAnswerUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer is correct
   *
   * @param {Array} answer user answer
   * @return {boolean}
   */
  isCorrect: function(answer){
    let utility = this;
    let correctAnswer = this.getCorrectAnswer();
    let correct = answer.get("length") === correctAnswer.get("length");
    answer.forEach(function(answerChoice){
      correct = correct && utility.isAnswerChoiceCorrect(answerChoice)
    });

    return correct;
  },

  /**
   * Indicates if the answer choice is correct
   * @param { { id: number, selection: boolean } } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    let correctAnswer = this.getCorrectAnswer();
    let found = correctAnswer.filterBy("id", answerChoice.id);
    return found.get("length") && found.get("firstObject.selection") === answerChoice.selection;
  },

  /**
   * Gets the correct answer
   * It returns which is the correct selection (yes=true | no=false) for each answer choice
   * @return {Array} the correct answer for this question type [ { id: string, selection: boolean }, ... ]
   */
  getCorrectAnswer: function(){
    const answers = this.get("question.answers");
    return answers.map(function(answer){
      return { id: answer.get("id"), selection: answer.get("isCorrect") };
    });
  }


});

export { QuestionUtil, MultipleChoiceUtil, MultipleAnswerUtil };
