import Ember from 'ember';

/**
 * It defines the answer object structure that is send to BE
 *
 * @typedef {Object} AnswerObject
 */
export const AnswerObject = Ember.Object.extend({

    /**
     * Answer text
     * @property {string}
     */
    text: null,

    /**
     * @property {boolean}
     */
    correct: Ember.computed("status", {
      get() {
        return this.get("status") === 'correct';
      },
      set(key, value) {
        this.set('status', value ? 'correct' : 'incorrect');
        return value;
      }
    }),

    /**
     * Answer status, correct or incorrect
     * @property {string}
     */
    status: null,

    /**
     * Answer order
     * @property {number}
     */
    order: null,
    /**
     * Answer id
     * @property {string}
     */
    answerId: null,

    /**
     * Skipped?
     * @property {boolean}
     */
    skip: null

  }),

// ---------------------- QuestionUtil
  /**
   * Base question util class
   * This utility class defines the basic behavior for all question types
   * it contains convenience methods to grade and retrieve useful information
   * from question types
   *
   * @typedef {Object} QuestionUtil
   */

  QuestionUtil = Ember.Object.extend({

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
    isCorrect: function (answer) {
      let utility = this;
      let correctAnswer = this.getCorrectAnswer();
      let correct = answer.get("length") === correctAnswer.get("length");
      answer.forEach(function (answerChoice, index) {
        correct = correct && utility.isAnswerChoiceCorrect(answerChoice, index);
      });

      return correct;
    },

    /**
     * Indicates if the answer choice is correct
     * @param { * } answerChoice
     */
    isAnswerChoiceCorrect: function (answerChoice) {
      Ember.Logger.warning("The method getCorrectAnswer is not implemented", answerChoice);
    },

    /**
     * This method should be implemented at different question types
     *
     * @return {*} the correct answer choice id
     */
    getCorrectAnswer: function () {
      Ember.Logger.warning("The method getCorrectAnswer is not implemented");
    },

    /**
     * This returns the answers distribution
     *
     * @param { [] } userAnswers, i.e [2,1,3,2,1]
     * @return { { answer: *, count: number, key: string }[] }
     */
    distribution: function (userAnswers) {
      const util = this;
      const distributionMap = {};
      const distribution = Ember.A([]);
      const total = userAnswers.length;
      userAnswers.forEach(function (userAnswer) {
        let answerKey = util.answerKey(userAnswer);
        let answerDistribution = distributionMap[answerKey];
        let count = 0;
        let percentage = 0;
        if (!answerDistribution) {
          answerDistribution = Ember.Object.create({
            answer: userAnswer,
            count: count,
            percentage: percentage,
            key: answerKey
          });
          distribution.addObject(answerDistribution);
          distributionMap[answerKey] = answerDistribution;
        }
        else {
          count = answerDistribution.get("count");
        }
        answerDistribution.set("count", ++count);
        answerDistribution.set("percentage", Math.round(count / total * 100));
      });
      return distribution;
    },

    /**
     * Returns a unique key representing the answer
     * @param answer
     * @returns {{}}
     */
    answerKey: function (answer) {
      return answer;
    },

    /**
     * Indicates if two answers are the same
     * @param answerA
     * @param answerB
     * @returns {boolean}
     */
    sameAnswer: function (answerA, answerB) {
      return this.answerKey(answerA) === this.answerKey(answerB);
    },

    /**
     * Converts the model user answer into an answerObject format
     * @param {*} userAnswer
     * @return {AnswerObject[]}
     */
    toAnswerObjects: function (userAnswer) {
      Ember.Logger.warning("The method toAnswerObject is not implemented", userAnswer);
    },

    /**
     * Converts an answerObject format to model userAnswer
     * @param {AnswerObject[]} answerObjects
     */
    toUserAnswer: function (answerObjects) {
      Ember.Logger.warning("The method toUserAnswer is not implemented", answerObjects);
    },

    /**
     * Gets an Answer by id
     * @param {string} answerId
     * @returns {Answer}
     */
    getAnswerById: function (answerId) {
      return this.get("question.answers").findBy("id", answerId);
    },

    /**
     * Gets an Answer by text
     * @param {string} text
     * @returns {Answer}
     */
    getAnswerByText: function (text) {
      return this.get("question.answers").findBy("text", text);
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
    isCorrect: function (answer) {
      return this.isAnswerChoiceCorrect(answer);
    },

    /**
     * Indicates if the answer choice is correct
     * @param { * } answerChoice
     */
    isAnswerChoiceCorrect: function (answerChoice) {
      return this.getCorrectAnswer() === answerChoice;
    },

    /**
     * Gets the correct answer
     *
     * @return {string} the correct answer choice id
     */
    getCorrectAnswer: function () {
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
    answerKey: function (answer) {
      return answer;
    },

    /**
     * Converts the model user answer into an answerObject format
     *
     * For MC looks like
     *
     * [{"text":"Apple","status":"correct","order":1,"answerId":1234,"skip":false}]
     *
     * @param {string} userAnswer answer choice id
     * @return {AnswerObject[]}
     */
    toAnswerObjects: function (userAnswer) {
      let util = this;
      let answer = util.getAnswerById(userAnswer);
      let answerObject = AnswerObject.create({
        "text": answer.get("text"),
        "correct": util.isCorrect(userAnswer),
        "order": 1,
        "answerId": userAnswer,
        "skip": false
      });
      return Ember.A([answerObject]);
    },

    /**
     * Converts an answerObject format to model userAnswer
     *
     * For MC looks like
     *
     * [{"text":"Apple","status":"correct","order":1,"answerId":1234,"skip":false}]
     *
     * @param {AnswerObject[]} answerObjects
     * @return {string} answer id
     */
    toUserAnswer: function (answerObjects) {
      let userAnswer = null;
      if (answerObjects.get("length")) {
        let answerObject = answerObjects.get("firstObject");
        userAnswer = answerObject.get("answerId");
      }

      return userAnswer;
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
    isAnswerChoiceCorrect: function (answerChoice) {
      let correctAnswer = this.getCorrectAnswer();
      let found = correctAnswer.filterBy("id", answerChoice.id);
      return found.get("length") && found.get("firstObject.selection") === answerChoice.selection;
    },

    /**
     * Gets the correct answer
     * It returns which is the correct selection (yes=true | no=false) for each answer choice
     * @return {Array} the correct answer for this question type [ { id: string, selection: boolean }, ... ]
     */
    getCorrectAnswer: function () {
      const answers = this.get("question.answers");
      return answers.map(function (answer) {
        return {id: answer.get("id"), selection: answer.get("isCorrect")};
      });
    },

    /**
     * Returns a unique key representing the answer
     * For multiple answer the answer is an array of { id: number, selection: boolean }
     * @param { { id: number, selection: boolean }[] } answer
     * @returns {string} i.e id_true,id_false,id_true
     */
    answerKey: function (answer) {
      let keys = Ember.A(answer).sortBy('id').map(function (item) {
        return item.id + "_" + item.selection;
      });
      return keys.toArray().join();
    },

    /**
     * Converts the model user answer into an answerObject format
     *
     * For MA looks like
     *
     *  [{"text":"Yes","status":"correct","order":1,"answerId":1234,"skip":false},
     *  {"text":"Yes","status":"incorrect","order":2,"answerId":1234,"skip":false},
     *  {"text":"No","status":"incorrect","order":3,"answerId":"1234,"skip":false},
     *  {"text":"No","status":"correct","order":4,"answerId":1235,"skip":false}]
     *
     * @param { { id: string, selection: boolean }[] } userAnswer
     * @return {AnswerObject[]}
     */
    toAnswerObjects: function (userAnswer) {
      let util = this;
      return userAnswer.map(function (item, index) {
        let answer = util.getAnswerById(item.id);
        let text = item.selection ? "Yes" : "No";
        return AnswerObject.create({
          "text": text,
          "correct": util.isAnswerChoiceCorrect(item),
          "order": index + 1,
          "answerId": answer.get("id"),
          "skip": false
        });
      });
    },

    /**
     * Converts an answerObject format to model userAnswer
     *
     * For MA looks like
     *
     *  [{"text":"Yes","status":"correct","order":1,"answerId":1234,"skip":false},
     *  {"text":"Yes","status":"incorrect","order":2,"answerId":1234,"skip":false},
     *  {"text":"No","status":"incorrect","order":3,"answerId":"1234,"skip":false},
     *  {"text":"No","status":"correct","order":4,"answerId":1235,"skip":false}]
     *
     * @param {AnswerObject[]} answerObjects
     * @return { { id: string, selection: boolean }[] } answer selections
     */
    toUserAnswer: function (answerObjects) {
      return answerObjects.map(function (answerObject) {
        return {id: answerObject.get("answerId"), selection: answerObject.get("text") === "Yes"};
      });
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
    /**
     * Converts the model user answer into an answerObject format
     *
     * For T/F looks like
     *
     * [{"text":"True","status":"correct","order":1,"answerId":1234,"skip":false}]
     *
     * The text could be True or False
     * If not answerId is found it should be 0
     *
     * @param {string} userAnswer answer choice id
     * @return {AnswerObject[]}
     */
    toAnswerObjects: function (userAnswer) {
      let util = this;
      let answer = util.getAnswerById(userAnswer);

      /*
       When no answer is found the userAnswer brings true or false indicating the user selection
       */
      let text = answer ? answer.get("text") : ( (userAnswer) ? "True" : "False" );

      /*
       When no answer if found the answerId should be 0
       */
      let answerId = answer ? userAnswer : 0;

      let answerObject = AnswerObject.create({
        "text": text,
        "correct": util.isCorrect(userAnswer),
        "order": 1,
        "answerId": answerId,
        "skip": false
      });
      return Ember.A([answerObject]);
    },

    /**
     * Converts an answerObject format to model userAnswer
     *
     * For MC looks like
     *
     * For T/F looks like
     *
     * [{"text":"True","status":"correct","order":1,"answerId":1234,"skip":false}]
     *
     * @param {AnswerObject[]} answerObjects
     * @return {string} answer id
     */
    toUserAnswer: function (answerObjects) {
      let userAnswer = null;
      if (answerObjects.get("length")) {
        let answerObject = answerObjects.get("firstObject");
        let text = answerObject.get("text");
        let answerId = answerObject.get("answerId");

        /*
         When answerId = 0, we need to use the text to know the answer selected
         */
        userAnswer = !answerId ? text === "True" : answerId;
      }

      return userAnswer;
    }
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
    isAnswerChoiceCorrect: function (answerChoice, index) {
      let correctAnswer = this.getCorrectAnswer();
      return correctAnswer.contains(answerChoice) &&
        correctAnswer.indexOf(answerChoice) === index;
    },

    /**
     * Gets the correct answer
     * @return {string[]} the correct answer for this question type
     */
    getCorrectAnswer: function () {
      const answers = this.get("question.answers");
      return answers.map(function (answer) {
        return answer.get("text");
      });
    },

    /**
     * Returns a unique key representing the answer
     * For FIB the answer is an array of strings
     * @param { string[] } answer i.e ['black', 'white', 'blue']
     * @returns { string }
     */
    answerKey: function (answer) {
      return answer.join();
    },

    /**
     * Converts the model user answer into an answerObject format
     *
     * For FIB looks like
     *
     * [{"text":"actions","status":"incorrect","order":1,"answerId":1234,"skip":false},
     *  {"text":"object","status":"incorrect","order":2,"answerId":1235,"skip":false}]
     *
     * @param { string[] } userAnswer i.e ['black', 'white', 'blue']
     * @return {AnswerObject[]}
     */
    toAnswerObjects: function (userAnswer) {
      let util = this;
      return userAnswer.map(function (text, index) {
        let answer = util.getAnswerByText(text);
        return AnswerObject.create({
          "text": text,
          "correct": util.isAnswerChoiceCorrect(text, index),
          "order": index + 1,
          "answerId": answer ? answer.get("id") : 0,
          "skip": false
        });
      });
    },

    /**
     * Converts an answerObject format to model userAnswer
     *
     * For FIB looks like
     *
     * [{"text":"actions","status":"incorrect","order":1,"answerId":1234,"skip":false},
     *  {"text":"object","status":"incorrect","order":2,"answerId":1235,"skip":false}]
     *
     * @param {AnswerObject[]} answerObjects
     * @return {string[]} answer texts i.e ['black', 'white', 'blue']
     */
    toUserAnswer: function (answerObjects) {
      answerObjects = answerObjects.sortBy("order");
      return answerObjects.map(function (answerObject) {
        return answerObject.get("text");
      });
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
    isAnswerChoiceCorrect: function (answerChoice, index) {
      let correctAnswer = this.getCorrectAnswer();
      return correctAnswer.contains(answerChoice) &&
        correctAnswer.indexOf(answerChoice) === index;
    },

    /**
     * Gets the correct answer
     * @return {string[]} returns the correct order for answer choice ids
     */
    getCorrectAnswer: function () {
      const answers = this.get("question.answers").sortBy("order");
      return answers.map(function (answer) {
        return answer.get("id");
      });
    },

    /**
     * Returns a unique key representing the answer
     * For Roerder the answer is an array of answer ids
     * @param { string[] } answer i.e ['answerId_1', 'answerId_2', 'answerId_3']
     * @returns { string }
     */
    answerKey: function (answer) {
      return answer.join();
    },

    /**
     * Converts the model user answer into an answerObject format
     *
     * For Reorder looks like
     *
     * [{"text":"1","status":"correct","order":1,"answerId":1234,"skip":false},
     * {"text":"2","status":"correct","order":3,"answerId":1234,"skip":false},
     * {"text":"3","status":"correct","order":2,"answerId":1234,"skip":false}]
     *
     * @param { string[] } userAnswer answer ids in selected order
     * @return {AnswerObject[]}
     */
    toAnswerObjects: function (userAnswer) {
      let util = this;
      return userAnswer.map(function (answerId, index) {
        let answer = util.getAnswerById(answerId);
        return AnswerObject.create({
          "text": answer.get("text"),
          "correct": util.isAnswerChoiceCorrect(answerId, index),
          "order": index + 1,
          "answerId": answerId,
          "skip": false
        });
      });
    },

    /**
     * Converts an answerObject format to model userAnswer
     *
     * For Reorder looks like
     *
     * [{"text":"1","status":"correct","order":1,"answerId":1234,"skip":false},
     * {"text":"2","status":"correct","order":3,"answerId":1234,"skip":false},
     * {"text":"3","status":"correct","order":2,"answerId":1234,"skip":false}]
     *
     * @param {AnswerObject[]} answerObjects
     * @return {string[]} answer ids in selected order
     */
    toUserAnswer: function (answerObjects) {
      answerObjects = answerObjects.sortBy("order");
      return answerObjects.map(function (answerObject) {
        return answerObject.get("answerId");
      });
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
     * @param { { index: number, text: string } } answerChoice
     */
    isAnswerChoiceCorrect: function (answerChoice) {
      let correctAnswer = this.getCorrectAnswer();
      let found = correctAnswer.findBy("index", answerChoice.index);
      return found !== null && found !== undefined; //if found
    },

    /**
     * Gets the correct answer
     * The question text contains the information for the correct answer, correct items are wrapped by []
     * i.e La casa es de [colo] pero el [teco] es azul
     * @return {{index: number, text: string }[]} returns the correct answer items
     */
    getCorrectAnswer: function () {
      const items = this.getItems();
      return items.filterBy("correct", true).map(function (item) {
        return {index: item.get("index"), text: item.get("text")};
      });
    },

    /**
     * Gets items based on text format.
     * This methods creates an item for each word in the text, it removes []
     * i.e La casa es de [colo] pero el [teco] es azul
     * @param {string} text
     * @returns {{index: number, text: string, selected: boolean}} items
     */
    getWordItems: function (text) {
      const util = this,
        words = Ember.A(text.split(" "));

      return util.toItems(words);
    },

    /**
     * Gets items based on text format
     * Each text before, after and in between [] are considered sentences
     * @param {string} text i.e Sentence 1 [Sentence 2] Sentence 3 with any text here [Sentence 4] Sentence 5
     *
     * @returns {{index: number, text: string, selected: boolean}} items
     */
    getSentenceItems: function (text) {
      const util = this,
        items = text.split(/(\[.*?])/gm);
      return util.toItems(items);
    },

    /**
     * Transforms the text so it is compliant with hot text highlight question.
     * It removes the initial/wrapping <p> tag if available
     * @param {string} text
     * @returns {string}
     */
    transformText: function (text) {
      const regex = /^<p>(.*)<\/p>$/gm,
        match = regex.exec(text);
      return (match) ? match[1].trim() : text;
    },

    /**
     * Transforms a list of string into item objects, it trims the texts and removes []
     * @param {string[]} textList
     *
     * @returns {{index: number, text: string, selected: boolean, correct: boolean}} items
     */
    toItems: function (textList) {
      textList = textList.filter(function (text) {
        let trimmed = text.trim();
        return trimmed || trimmed.length;
      });

      return textList.map(function (text, index) {
        let correct = text.indexOf("[") >= 0 && text.indexOf("]") > 0;
        return Ember.Object.create({
          index: index,
          text: text.replace("[", "").replace("]", "").trim(),
          selected: false,
          correct: correct
        });
      });
    },

    /**
     * Generate phrase items from the first question answer text
     * It handle word and sentence variants, and it sets the 'items' component property accordingly
     */
    getItems: function () {
      const util = this,
        question = util.get("question"),
        answers = question.get("answers");

      var items = Ember.A();
      if (question.get("hasAnswers")) {
        const answer = answers.get("firstObject"),
          text = util.transformText(answer.get("text"));

        if (question.get("isHotTextHighlightWord")) {
          items = util.getWordItems(text);
        }
        else {
          items = util.getSentenceItems(text);
        }
      }

      return items;
    },

    /**
     * Returns a unique key representing the answer
     * For hot text the answer is an array of string
     * @param { {index: number, text: string }[] } answer
     * @returns {string} i.e 1,2,3
     */
    answerKey: function (answer) {
      let indexes = answer.map(function (item) {
        return item.index;
      });
      return indexes.sort().join();
    },

    /**
     * Converts the model user answer into an answerObject format
     *
     * For HotTextHighlight looks like
     *
     * [{"text":"Tell","status":"incorrect","order":1,"answerId":0,"skip":false},
     * {"text":"nos.","status":"correct","order":14,"answerId":0,"skip":false},
     * {"text":"parens","status":"correct","order":31,"answerId":0,"skip":false}]
     *
     * @param { {index: number, text: string }[] } userAnswer answer ids in selected order
     * @return {AnswerObject[]}
     */
    toAnswerObjects: function (userAnswer) {
      let util = this;
      return userAnswer.map(function (selection) {
        let index = selection.index;
        return AnswerObject.create({
          "text": selection.text,
          "correct": util.isAnswerChoiceCorrect(selection),
          "order": index + 1,
          "answerId": 0,
          "skip": false
        });
      });
    },

    /**
     * Converts an answerObject format to model userAnswer
     *
     * For HotTextHighlight looks like
     *
     * [{"text":"Tell","status":"incorrect","order":1,"answerId":0,"skip":false},
     * {"text":"nos.","status":"correct","order":14,"answerId":0,"skip":false},
     * {"text":"parens","status":"correct","order":31,"answerId":0,"skip":false}]
     *
     * @param {AnswerObject[]} answerObjects
     * @return {{index: number, text: string }[]} answer ids in selected order
     */
    toUserAnswer: function (answerObjects) {
      return answerObjects.map(function (answerObject) {
        return { index: (answerObject.get("order") - 1), text: answerObject.get("text") }
      });
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
    isAnswerChoiceCorrect: function (answerChoice) {
      let correctAnswer = this.getCorrectAnswer();
      return correctAnswer.contains(answerChoice);
    },

    /**
     * Gets the correct answer
     * @return {string[]} returns the correct answer choice ids
     */
    getCorrectAnswer: function () {
      let answers = this.get("question.answers");
      let correctAnswers = answers.filterBy("isCorrect", true);
      return correctAnswers.map(function (answer) {
        return answer.get("id");
      });
    },

    /**
     * Returns a unique key representing the answer
     * For hot spot image the answer is an array of ids
     * @param { string[] } answer
     * @returns {string} i.e id1,id2,id3
     */
    answerKey: function (answer) {
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

  }),

  /**
   * It contains convenience methods for grading and retrieving useful information
   * from this question type
   *
   * @typedef {Object} OpenEndedUtil
   */
  OpenEndedUtil = QuestionUtil.extend({

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
    isCorrect: function (answer) {
      return !!answer; //if answer exists, OE is not graded right now
    },

    /**
     * Gets the correct answer
     *
     * @return {boolean} the correct answer choice id
     */
    getCorrectAnswer: function () {
      return false; //there is no correct answer for OE
    },

    /**
     * Returns a unique key representing the answer
     * For multiple choice the answer id is already unique
     * @param {string} answer
     * @returns {string}
     */
    answerKey: function (answer) {
      return answer;
    }

  });
