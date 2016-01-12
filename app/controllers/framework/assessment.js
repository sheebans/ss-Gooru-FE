import Ember from 'ember';

export default Ember.Controller.extend({

  // TODO: Get this object dynamically from the route

  assessmentResult: Ember.Object.create({

    assessmentName: 'Sample Assessment Name',

    // --- COMPUTED PROPERTIES --- //
    /**
     * Average user reaction to the questions in the assessment
     * @prop {Number}
     */
    reaction: 4,

    /**
     * Total number of seconds spent completing the current attempt
     * @prop {Number}
     */
    timeSpent: 106969,

    /**
     * Percentage of correct answers vs. the total number of questions for the current
     * assessment attempt
     * @prop {Number}
     */
    correctPercentage: 75,

    /**
     * Number of questions correctly answered in the current assessment attempt
     * @prop {Number}
     */
    correctAnswers: 3,

    /**
     * Index of score bracket (@see /app/config/config~SCORE_BRACKETS)
     * @prop {Number}
     */
    scoreBracketNumber: 2,

    /**
     * Total number of attempts made by the user for this assessment
     * 1-indexed
     * @prop {Number}
     */
    totalAttempts: 4,

    /**
     * Total number of questions in the assessment
     * @prop {Number}
     */
    totalQuestions: 4,

    // --- END OF COMPUTED PROPERTIES --- //

    /**
     * List of IDs of all the attempts made by a user for an assessment
     * @prop {Number[]}
     */
    attemptsList: [
      100,
      101,
      102,
      103
    ],

    /**
     * Current attempt to which the {@link results} results and {@link learningTargets} make reference
     * 1-indexed
     */
    currentAttempt: 4,

    /**
     * Date in which the current attempt was submitted
     */
    submittedOn: 'Friday, January 15, 2016 6:02 AM',

    /**
     * Evaluation results for the current attempt for each one of the learning targets
     * that make up the assessment
     */
    learningTargets: [
      Ember.Object.create({
        'label': "1",
        'value': 'some-value-1'
      }),
      Ember.Object.create({
        'label': "2",
        'value': 'some-value-2'
      }),
      Ember.Object.create({
        'label': "3",
        'value': 'some-value-3'
      })],

    /**
     * Evaluation results for the current attempt for each one of the questions that
     * make up the assessment
     */
    results: Ember.A([Ember.Object.create({
      question: Ember.Object.create({
        text:"This is a question 1"
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5,
      order: 1,
      answer: "answer" // json object representing each question type answer
    }),Ember.Object.create({
      question: Ember.Object.create({
        text:"This is a question 2"
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 2,
      order: 2,
      answer: "answer" // json object representing each question type answer
    })])

  })

});
