import Ember from 'ember';

/**
 * Base question util class
 * This utility class defines the basic behavior for all question types
 * it contains convenience methods to grade and retrieve useful information
 * from question types
 *
 * @typedef {Object} QuestionUtil
 */
export const QuestionUtil = Ember.Object.extend({

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
   * Indicates if the answer is correct
   * Default implementation, it check if all answer choices are correct
   *
   * @param {Array} answer user answer
   * @return {boolean}
   */
  isCorrect: function(answer){
    let utility = this;
    let correctAnswer = this.getCorrectAnswer();
    let correct = answer.get("length") === correctAnswer.get("length");
    answer.forEach(function(answerChoice, index){
      correct = correct && utility.isAnswerChoiceCorrect(answerChoice, index);
    });

    return correct;
  },

  /**
   * Indicates if the answer choice is correct
   * @param { * } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    Ember.Logger.warning("The method getCorrectAnswer is not implemented", answerChoice);
  },

  /**
   * This method should be implemented at different question types
   *
   * @return {*} the correct answer choice id
   */
  getCorrectAnswer: function(){
    Ember.Logger.warning("The method getCorrectAnswer is not implemented");
  },

  /**
   * This returns the answers distribution
   * @param { [] } userAnswers, i.e [2,1,3,2,1]
   * @return { [] } i.e [ { answer: 2, count: 2}, { answer: 1, count: 2}, { answer: 3, count: 1}]
   */
  distribution: function(userAnswers){
    const util = this;
    const distributionMap = {};
    const distribution = Ember.A([]);
    userAnswers.forEach(function(userAnswer){
      let answerKey = util.answerKey(userAnswer);
      let answerDistribution = distributionMap[answerKey];
      let count = 0;
      if (!answerDistribution){
        answerDistribution = Ember.Object.create({ answer: userAnswer, count: count, key: answerKey });
        distribution.addObject(answerDistribution);
        distributionMap[answerKey] = answerDistribution;
      }
      else{
        count = answerDistribution.get("count");
      }
      answerDistribution.set("count", ++count);
    });
    return distribution;
  },

  /**
   * Returns a unique key representing the answer
   * @param answer
   * @returns {{}}
   */
  answerKey: function(answer){
    return answer;
  }

}),


/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleChoiceUtil
 */
MultipleChoiceUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer is correct
   * It overrides the default implementation
   *
   * @param {string} answer user answer
   * @return {boolean}
   */
  isCorrect: function(answer){
    return this.isAnswerChoiceCorrect(answer);
  },

  /**
   * Indicates if the answer choice is correct
   * @param { * } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    return this.getCorrectAnswer() === answerChoice;
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
  },

  /**
   * Returns a unique key representing the answer
   * For multiple choice the answer id is already unique
   * @param {number} answer i.e 1
   * @returns {number} i.e 1
   */
  answerKey: function(answer){
    return answer;
  }

}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} MultipleAnswerUtil
 */
MultipleAnswerUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
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
  },

  /**
   * Returns a unique key representing the answer
   * For multiple answer the answer is an array of { id: number, selection: boolean }
   * @param { { id: number, selection: boolean }[] } answer
   * @returns {string} i.e id_true,id_false,id_true
   */
  answerKey: function(answer){
    let keys = Ember.A(answer).sortBy('id').map(function(item){
      return item.id + "_" + item.selection;
    });
    return keys.toArray().join();
  }


}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} TrueFalseUtil
 */
TrueFalseUtil = MultipleChoiceUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

}),


/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} FillInTheBlankUtil
 */
FillInTheBlankUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   * @param { number } index position of the answer
   */
  isAnswerChoiceCorrect: function(answerChoice, index){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice) &&
      correctAnswer.indexOf(answerChoice) === index;
  },

  /**
   * Gets the correct answer
   * @return {string[]} the correct answer for this question type
   */
  getCorrectAnswer: function(){
    const answers = this.get("question.answers");
    return answers.map(function(answer){
      return answer.get("text");
    });
  },

  /**
   * Returns a unique key representing the answer
   * For FIB the answer is an array of strings
   * @param { string[] } answer i.e ['black', 'white', 'blue']
   * @returns { string }
   */
  answerKey: function(answer){
    return answer.join();
  }

}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} ReorderUtil
 */
ReorderUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   * @param { number } index position of the answer
   */
  isAnswerChoiceCorrect: function(answerChoice, index){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice) &&
      correctAnswer.indexOf(answerChoice) === index;
  },

  /**
   * Gets the correct answer
   * @return {string[]} returns the correct order for answer choice ids
   */
  getCorrectAnswer: function() {
    const answers = this.get("question.answers").sortBy("order");
    return answers.map(function(answer){
      return answer.get("id");
    });
  },

  /**
   * Returns a unique key representing the answer
   * For FIB the answer is an array of strings
   * @param { string[] } answer i.e ['black', 'white', 'blue']
   * @returns { string }
   */
  answerKey: function(answer){
    return answer.join();
  }

}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} HotTextHighlightUtil
 */
HotTextHighlightUtil = QuestionUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice);
  },

  /**
   * Gets the correct answer
   * The question text contains the information for the correct answer, correct items are wrapped by []
   * i.e La casa es de [colo] pero el [teco] es azul
   * @return {string[]} returns the correct answer choice ids
   */
  getCorrectAnswer: function(){
    const text = this.get("question.text");
    const regex = /(\[.*?])/gm;

    let items = Ember.A();
    let match = regex.exec(text);
    while (match != null) {
      let correctValue = match[0].replace("[", "").replace("]", ""); //replacing [ ]
      items.pushObject(correctValue);
      match = regex.exec(text);
    }

    return items;
  },

  /**
   * Returns a unique key representing the answer
   * For hot text the answer is an array of string
   * @param { string[] } answer
   * @returns {string} i.e text1,text2,text3
   */
  answerKey: function(answer){
    return answer.sort().join();
  }


}),

/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} HotSpotImageUtil
 */
HotSpotImageUtil = MultipleAnswerUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods
  /**
   * Indicates if the answer choice is correct
   * @param { string } answerChoice
   */
  isAnswerChoiceCorrect: function(answerChoice){
    let correctAnswer = this.getCorrectAnswer();
    return correctAnswer.contains(answerChoice);
  },

  /**
   * Gets the correct answer
   * @return {string[]} returns the correct answer choice ids
   */
  getCorrectAnswer: function(){
    let answers = this.get("question.answers");
    let correctAnswers = answers.filterBy("isCorrect", true);
    return correctAnswers.map(function(answer){
      return answer.get("id");
    });
  },

  /**
   * Returns a unique key representing the answer
   * For hot spot image the answer is an array of ids
   * @param { string[] } answer
   * @returns {string} i.e id1,id2,id3
   */
  answerKey: function(answer){
    return answer.sort().join();
  }


}),


/**
 * It contains convenience methods for grading and retrieving useful information
 * from this question type
 *
 * @typedef {Object} HotSpotTextUtil
 */
HotSpotTextUtil = HotSpotImageUtil.extend({

  // -------------------------------------------------------------------------
  // Observers


  // -------------------------------------------------------------------------
  // Methods

});
