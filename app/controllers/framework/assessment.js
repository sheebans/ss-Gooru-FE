import Ember from 'ember';
import AssessmentResult from 'gooru-web/models/result/assessment';
import QuestionResultDetails from 'gooru-web/models/result/question-details';

export default Ember.Controller.extend({

  assessmentResult: AssessmentResult.create({
    id: 501,

    questionsResults: [

      QuestionResultDetails.create({
        id: 601,
        question: {
          questionType: 'MC',
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          answers: [],
          order: 1
        },
        correct: false,
        score: 10,
        reaction: 2,
        timeSpent: 28,
        userAnswer: []
      }),

      QuestionResultDetails.create({
        id: 603,
        question: {
          questionType: 'MC',
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          answers: [],
          order: 3
        },
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer: []
      }),

      QuestionResultDetails.create({
        id: 602,
        attempt: 1104,
        question: {
          questionType: 'OE',
          text: 'This is question 1',
          hints: [],
          explanation: 'Sample explanation text',
          answers: [],
          order: 2
        },
        correct: true,
        score: 10,
        reaction: 3,
        timeSpent: 56,
        userAnswer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
      })
    ],

    mastery: [],
    selectedAttempt: 2,
    submittedOn: new Date(),
    title: 'Test Assessment Name',
    totalAttempts: 2
  })

});
