import Ember from 'ember';

// TODO: Remove these imports if the classes are turned into Ember Data models
import AssessmentResult from 'gooru-web/models/result/assessment';
import AttemptResult from 'gooru-web/models/result/attempt';
import QuestionResult from 'gooru-web/models/result/question';

export default Ember.Controller.extend({

  // TODO: The idea is that this will be an instance of the model result/assessment
  assessmentResult: AssessmentResult.create({
    id: 501,
    attempts: [
      1101,
      1102,
      1103,
      1104
    ],
    user: 901,
    title: 'Test Assessment Name'
  }),

  // TODO: The idea is that this will be an instance of the model result/attempt
  attemptResult: AttemptResult.create({
    id: 1104,
    assessmentResult: 501,
    mastery: [],
    questionResults: [
      QuestionResult.create({
        id: 601,
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
      }),
      QuestionResult.create({
        id: 603,
        attempt: 1104,
        question: {
          id: 203,
          questionType: 'MC',
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          order: 3
        },
        user: 901,
        correct: true,
        reaction: 4,
        timeSpent: 28,
        answer: []
      }),
      QuestionResult.create({
        id: 602,
        attempt: 1104,
        question: {
          id: 202,
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          order: 2
        },
        user: 901,
        correct: true,
        reaction: 3,
        timeSpent: 56,
        answer: []
      })
    ],
    submittedOn: 'Friday, January 15, 2016 6:02 AM',
    user: 901
  })

});
