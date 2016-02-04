import Ember from 'ember';
import AssessmentResult from 'gooru-web/models/result/assessment';
import LearningTargetResult from 'gooru-web/models/result/learning-target';
import QuestionDetailsResult from 'gooru-web/models/result/question-details';
import ResourceResult from 'gooru-web/models/result/resource';

export default Ember.Controller.extend({

  assessmentResult: AssessmentResult.create({
    id: 501,

    questionsResults: [

      QuestionDetailsResult.create({
        id: 601,
        resource: Ember.Object.create({
          questionType: 'MC',
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
          ]),
          order: 1
        }),
        correct: false,
        score: 10,
        reaction: 2,
        timeSpent: 28,
        userAnswer: "1"
      }),

      QuestionDetailsResult.create({
        id: 602,
        resource: Ember.Object.create({
          questionType: 'MC',
          text: 'Sample Question MC',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: false,text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: false,text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true,text:"Answer 3" })
          ]),
          order: 2
        }),
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer: "3"
      }),

      QuestionDetailsResult.create({
        id: 603,
        attempt: 1104,
        resource: Ember.Object.create({
          questionType: 'OE',
          text: 'Sample Question OE',
          hints: [],
          explanation: 'Sample explanation text',
          answers: [],
          order: 3
        }),
        correct: true,
        score: 10,
        reaction: 3,
        timeSpent: 56,
        userAnswer: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,  sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
      }),

      QuestionDetailsResult.create({
        id: 604,
        resource: Ember.Object.create({
          questionType: 'T/F',
          text: 'True False Question',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: false,text:"True" }),
            Ember.Object.create({ id: "2", isCorrect: true,text:"False" }),
          ]),
          order: 4
        }),
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer: "1"
      }),

      QuestionDetailsResult.create({
        id: 605,
        resource: Ember.Object.create({
          questionType: 'HT_RO',
          text: 'Reorder Question',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "crc", text:"Costa Rica", order: 2 }),
            Ember.Object.create({ id: "bra", text:"Brasil", order: 3 }),
            Ember.Object.create({ id: "pan", text:"Panamá", order: 1 }),
            Ember.Object.create({ id: "chi", text:"Chile", order: 4 })
          ]),
          order: 5
        }),
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer: ["chi", "crc", "bra", "pan"]
      }),

      QuestionDetailsResult.create({
        id: 606,
        resource: Ember.Object.create({
          questionType: 'FIB',
          text: 'The sun is _______ and the moon _______',
          hints: [],
          explanation: 'Sample explanation text',
          answers: Ember.A([
            Ember.Object.create({id: 1, text: 'yellow'}),
            Ember.Object.create({id: 2, text: 'white'})
          ]),
          order: 8
        }),
        correct: true,
        score: 10,
        reaction: 2,
        timeSpent: 28,
        userAnswer: Ember.A(['yellow','white'])
      }),

      QuestionDetailsResult.create({
        id: 607,
        question: Ember.Object.create({
          questionType: 'FIB',
          text: 'The mountain is _______ and the sky _______',
          hints: [],
          explanation: 'Sample explanation text',
          answers: Ember.A([
            Ember.Object.create({id: 1, text: 'green'}),
            Ember.Object.create({id: 2, text: 'blue'})
          ]),
          order: 7
        }),
        correct: false,
        score: 0,
        reaction: 2,
        timeSpent: 28,
        userAnswer: Ember.A(['yellow','white'])
      }),

      QuestionDetailsResult.create({
        id: 608,
        question: Ember.Object.create({
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          order: 6
        }),
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer:  Ember.A([{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}])
      }),

      QuestionDetailsResult.create({
        id: 609,
        resource: Ember.Object.create({
          questionType: 'HT_HL',
          text: '<p>Seleccione las palabras escritas incorrectamente</p>',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A(["<p>[Le] casa es de [colo] rojo pero pero el [teco] es azul ajax</p>"]),
          order: 9
        }),
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer:  Ember.A(["<p>[Le] casa es de colo rojo pero [pero] el [teco] es azul [ajax]</p>"])
      }),

      QuestionDetailsResult.create({
        id: 610,
        resource: Ember.Object.create({
          questionType: 'HS_IMG',
          text: 'Sample Question HS_IMG',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: true, image:"http://qacdn.gooru.org/qalive/f000/2441/3272/4a12b833-9106-48ef-95b5-ac3ff73575ae.png" }),
            Ember.Object.create({ id: "2", isCorrect: false, image:"" }),
            Ember.Object.create({ id: "3", isCorrect: true, image:"" })
          ]),
          order: 10
        }),
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer:  Ember.A(["1", "2"])
      }),

      QuestionDetailsResult.create({
        id: 611,
        resource: Ember.Object.create({
          questionType: 'HS_TXT',
          text: 'Sample Question HS_TXT',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: true, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: false, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          order: 11
        }),
        correct: true,
        score: 10,
        reaction: 4,
        timeSpent: 28,
        userAnswer:  Ember.A(["1", "2"])
      })
    ],

    mastery: [

      LearningTargetResult.create({
        description:'I will understand how to create a ruler and with 1 inch, 1/2 inch, 1/4 inch intervals and generate' +
          'measurement data',
        mastery: 50,
        relatedQuestions: [606, 609],
        standard: '3.MD.4',
        suggestedResources: [

          ResourceResult.create({
            resource:{
              title: "Learn the MEAN Stack",
              resourceFormat: "video"
            },
            reaction: 4,
            timeSpent: 2841
          }),
          ResourceResult.create({
            resource:{
              resourceFormat: "video",
              title:"Learn the MEAN Stack"
            },
            reaction: 0,
            timeSpent: 12345
          }),
          ResourceResult.create({
            resource:{
              resourceFormat: "video",
              title:"Learn the MEAN Stack"
            },
            reaction: 4,
            timeSpent: 2841
          }),
          ResourceResult.create({
            resource:{
              resourceFormat: "video",
              title:"Learn the MEAN Stack"
            },
            reaction: 4,
            timeSpent: 2841
          }),
          QuestionDetailsResult.create({
            resource:{
              resourceFormat:"question",
              title: "Question with a very long name",
              text: "Question with a very long name",
              questionType: 'FIB',
              isQuestion: true},
            reaction: 4,
            timeSpent: 2341
          })
        ]
      }),

      LearningTargetResult.create({
        description: 'I will understand how to create a ruler and with 1 inch, 1/2 inch, 1/4 inch intervals and generate' +
        'measurement data',
        mastery: 75,
        relatedQuestions: [601, 602, 605, 607],
        standard: '3.MD.7',
        suggestedResources: [

          ResourceResult.create({
            resource:{
              title: "Learn the MEAN Stack",
              resourceFormat: "video"
            },
            reaction: 2,
            timeSpent: 2841
          })
        ]
      }),

      LearningTargetResult.create({
        description: 'I will understand how to create a ruler and with 1 inch, 1/2 inch, 1/4 inch intervals and generate' +
        'measurement data',
        mastery: 80,
        relatedQuestions: [603, 604, 608, 610, 611],
        standard: '5.ME.2',
        suggestedResources: [

          ResourceResult.create({
            resource:{
              title: "Learn the MEAN Stack",
              resourceFormat: "video"
            },
            reaction: 4,
            timeSpent: 2841
          })
        ]
      })
    ],

    selectedAttempt: 2,
    submittedOn: new Date(),
    title: 'Test Assessment Name',
    totalAttempts: 2
  })

});
