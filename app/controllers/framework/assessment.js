import Ember from 'ember';

export default Ember.Controller.extend({

  // TODO: The idea is that this will be an instance of the model result/assessment
  asmtResult: {
    id: 501,
    attempts: [
      1104,
      1103,
      1102,
      1101
    ],
    user: 901,
    title: 'Test Assessment Name'
  },

  attemptResult: {
    id: 1104,
    assessmentResult: 501,
    mastery: [],
    questionResults: [
      {
        attempt: 1104,
        question: {
          id: 201,
          questionType: 'MC',
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          order: 1
        },
        user: 901,
        correct: false,
        reaction: 2,
        timeSpent: 28,
        answer: []
      },
      {
        attempt: 1104,
        question: {
          id: 202,
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          order: 1
        },
        user: 901,
        correct: true,
        reaction: 3,
        timeSpent: 14,
        answer: []
      }
    ],
    submittedOn: 'Friday, January 15, 2016 6:02 AM',
    user: 901
  },

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
    timeSpent: 1695,

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
     * Concise model to be used by the gru-bubbles component
     * Computed property (map) of 'results'
     * @prop {Object[]}
     */
    resourceLinks: [
      Ember.Object.create({
        'label': "1",
        'status': 'correct',
        'value': 890
      }),
      Ember.Object.create({
        'label': "2",
        'status': 'incorrect',
        'value': 891
      })],

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
      id: 890,
      question: Ember.Object.create({
        text:"This is a question 1"
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5,
      order: 1,
      answer: "answer" // json object representing each question type answer
    }), Ember.Object.create({
      id: 891,
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
