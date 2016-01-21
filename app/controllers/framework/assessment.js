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
          isMultipleChoice: true,
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
          ]),
          order: 1
        },
        correct: false,
        score: 10,
        reaction: 2,
        timeSpent: 28,
        userAnswer: "1"
      }),

      QuestionResultDetails.create({
        id: 603,
        question: {
          questionType: 'MC',
          isMultipleChoice: true,
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
          ]),
          order: 2
        },
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer: "3"
      }),


      QuestionResultDetails.create({
        id: 602,
        attempt: 1104,
        question: {
          questionType: 'OE',
          text: 'Sample Question OE',
          hints: [],
          explanation: 'Sample explanation text',
          answers: [],
          order: 3,
          isOpenEnded: true
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
