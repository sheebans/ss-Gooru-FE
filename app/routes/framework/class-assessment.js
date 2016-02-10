import Ember from 'ember';
import UserQuestionsResult from 'gooru-web/models/result/user-questions';
import QuestionResult from 'gooru-web/models/result/question';


export default Ember.Route.extend({

  model: function(){

// TODO: Get this objects dynamically from the route

    const assessment = Ember.Object.create({

      collectionType: 'assessment',
      title: 'Sample Assessment Name',

      // Will this value be the same as questionCount
      // if there are only questions in the collection?
      resourceCount: 15,
      questionCount: 15,
      visibility: true,
      resources: [
        Ember.Object.create({ //Multiple Choice
          "id": "569906aa20b7dfae1bcd5262",
          questionType: 'MC',
          text: 'Sample Question MC',
          answers:  Ember.A([
            Ember.Object.create({ id: 1, isCorrect: false,text:"Answer 1" }),
            Ember.Object.create({ id: 2, isCorrect: false,text:"Answer 2" }),
            Ember.Object.create({ id: 3, isCorrect: true,text:"Answer 3" })
          ]),
          order: 1,
          "resourceFormat": "question",
          "narration": "Id eu mollit sunt Lorem voluptate ut officia ut. Non non nulla exercitation eu duis laboris Lorem id deserunt ullamco laborum aliqua nostrud. Dolor consequat dolor consequat labore officia cillum ad nulla proident. Veniam consequat sint Lorem nulla reprehenderit occaecat dolore excepteur eiusmod.",
          "hints": [
            {
              "hintId": "98cdadb3-5ef4-4fad-92c5-3c09403ce5e6",
              "hintText": "<p>Deserunt voluptate labore est sit nostrud ex et quis aliqua veniam deserunt ullamco.</p>",
              "sequence": 1
            },
            {
              "hintId": "21e07610-a788-4549-a57c-b79ab32b8909",
              "hintText": "<p>Pariatur est excepteur est cupidatat.</p>",
              "sequence": 2
            }
          ],
          "explanation": "<p>Culpa laborum deserunt cillum sunt laboris voluptate ut ea elit ex adipisicing officia. Ad laboris tempor officia non ut sit consequat quis esse et cupidatat officia.</p>",
          "hasAnswers": true,
          "hasNarration": true
        }),
        Ember.Object.create({ //true false
          "id": "569906aa3ec3bb39969acbe6",
          questionType: 'T/F',
          text: 'True False Question',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([
            Ember.Object.create({ id: "1", isCorrect: true,text:"True" }),
            Ember.Object.create({ id: "2", isCorrect: false,text:"False" }),
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 2,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aadfa0072204f7c7c7",
          questionType: 'HT_RO',
          text: 'Reorder Question',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["crc", "bra", "pan", "chi"]
            Ember.Object.create({ id: "crc", text:"Costa Rica", order: 1 }),
            Ember.Object.create({ id: "bra", text:"Brasil", order: 2 }),
            Ember.Object.create({ id: "pan", text:"Panamá", order: 3 }),
            Ember.Object.create({ id: "chi", text:"Chile", order: 4 })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 3,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aacea8416665209d53",
          questionType: 'FIB',
          text: 'The sun is _______ and the moon _______',
          hints: [],
          explanation: 'Sample explanation text',
          answers: Ember.A([
            Ember.Object.create({id: 1, text: 'yellow'}),
            Ember.Object.create({id: 2, text: 'white'})
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 4,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa77bebed003fa6eb1",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 5,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa68f276ae7ea03c30",
          questionType: 'HT_HL',
          text: '<p>Seleccione las palabras escritas incorrectamente</p>',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["le", "colo", "teco"]
            Ember.Object.create({ id: "1", text:"<p>[Le] casa es de [colo] rojo pero pero el [teco] es azul ajax</p>" })
          ]),
          isHotTextHighlightWord: true,
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 6,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa04f742731bd4e896",
          questionType: 'HS_IMG',
          text: 'Sample Question HS_IMG',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["1", "3"]
            Ember.Object.create({ id: "1", isCorrect: true, image:"http://qacdn.gooru.org/qalive/f000/2441/3272/4a12b833-9106-48ef-95b5-ac3ff73575ae.png" }),
            Ember.Object.create({ id: "2", isCorrect: false, image:"" }),
            Ember.Object.create({ id: "3", isCorrect: true, image:"" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "narration": "Deserunt occaecat ullamco cillum in incididunt anim sit consequat consequat sit. Ipsum duis irure do quis amet cupidatat tempor qui nulla commodo nisi veniam. Culpa Lorem consequat ad officia. Consectetur minim pariatur id laborum tempor voluptate dolor quis laboris et quis commodo.",
          "order": 7,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aabfcfc4cfc1b29b62",
          questionType: 'HS_TXT',
          text: 'Sample Question HS_TXT',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // ["1", "3"]
            Ember.Object.create({ id: "1", isCorrect: true, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: false, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 8,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa7fe0695bfd409731",
          questionType: 'OE',
          text: 'Sample Question OE',
          hints: [],
          explanation: 'Sample explanation text',
          answers: [],
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 9
        }),
        Ember.Object.create({
          "id": "569906aae3191722d9b42f22",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 10,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa283a7b45e6777a52",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 11,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aab4d366e4ada0c67d",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 12,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa9fa514e9304c0549",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 13,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa575aa6e617b38e16",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 14,
          "hasAnswers": true
        }),
        Ember.Object.create({
          "id": "569906aa25189b0dc0a981ba",
          questionType: 'MA',
          text: 'Sample Question MA',
          hints: [],
          explanation: 'Sample explanation text',
          answers:  Ember.A([ // [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
            Ember.Object.create({ id: "1", isCorrect: false, text:"Answer 1" }),
            Ember.Object.create({ id: "2", isCorrect: true, text:"Answer 2" }),
            Ember.Object.create({ id: "3", isCorrect: true, text:"Answer 3" })
          ]),
          "resourceType": "assessment-question",
          "resourceFormat": "question",
          "order": 15,
          "hasAnswers": true
        })
      ],
      hasResources: true,
      isAssessment: true
    });

    const students = Ember.A([
      Ember.Object.create({
        "id": "56983a9060a68052c1ed934c",
        "fullName": "Rocha, Perez",
        "code": 'd934c'
      }),
      Ember.Object.create({
        "id": "56983a90fb01fecc328e2388",
        "fullName": "Snyder, Mason",
        "code": 'e2388'

      }),
      Ember.Object.create({
        "id": "56983a906596902edadedc7c",
        "fullName": "Robles, Guadalupe",
        "code": 'edc7c'
      }),
      Ember.Object.create({
        "id": "56983a901bc3d60c88ac2fe2",
        "fullName": "George, Mariana",
        "code": 'ac2fe2'
      }),
      Ember.Object.create({
        "id": "56983a9082f705e65f2fe607",
        "fullName": "Hutchinson, Blake",
        "code": '2fe607'
      }),
      Ember.Object.create({
        "id": "56983a905ed41a7863401287",
        "fullName": "Maddox, Vincent",
        "code": '01287'
      }),
      Ember.Object.create({
        "id": "56983a90297d42fd4ed7c1de",
        "fullName": "Chase, Brandie",
        "code": '7c1de'
      }),
      Ember.Object.create({
        "id": "56983a900f77bf820df2cb9c",
        "fullName": "Higgins, Nellie",
        "code": '2cb9c'
      }),
      Ember.Object.create({
        "id": "56983a90231a29de51a368d4",
        "fullName": "Pope, Adele",
        "code": '368d4'
      }),
      Ember.Object.create({
        "id": "56983a901ad65da6dac5b384",
        "fullName": "Steele, Nadine",
        "code": '5b384'
      })
    ]);

    // TODO: Remove once the service that returns the user results is implemented
    var userResults = [
      UserQuestionsResult.create({
        "user": "56983a9060a68052c1ed934c",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 1"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a90fb01fecc328e2388",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 2"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a906596902edadedc7c",
        "questionsResults": [
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["orange", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 3"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a901bc3d60c88ac2fe2",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "gray"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 4"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a9082f705e65f2fe607",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["orange", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 5"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a905ed41a7863401287",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "chi", "pan"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 6"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a90297d42fd4ed7c1de",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "1"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "chi", "pan"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "white"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["2", "3"]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa25189b0dc0a981ba",
            "reaction": 4,
            "timeSpent": 1409,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a900f77bf820df2cb9c",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["bra", "crc", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["yellow", "gray"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["le", "colo", "teco"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1", "2"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 7"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: true}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660
          }),
          QuestionResult.create({
            "correct": null,
            "questionId": "569906aa575aa6e617b38e16",
            "reaction": 2,
            "timeSpent": 257
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a90231a29de51a368d4",
        "questionsResults": [
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 3
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa68f276ae7ea03c30",
            "reaction": 2,
            "timeSpent": 1830,
            "userAnswer": ["casa", "rojo"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa04f742731bd4e896",
            "reaction": 2,
            "timeSpent": 2081,
            "userAnswer": ["1"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 8"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: false}, {id: "3", selection: true}]
          })
        ]
      }),
      UserQuestionsResult.create({
        "user": "56983a901ad65da6dac5b384",
        "questionsResults": [
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa20b7dfae1bcd5262",
            "reaction": 2,
            "timeSpent": 701,
            "userAnswer": 2
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa3ec3bb39969acbe6",
            "reaction": 4,
            "timeSpent": 1333,
            "userAnswer": "2"
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aadfa0072204f7c7c7",
            "reaction": 5,
            "timeSpent": 1305,
            "userAnswer": ["crc", "bra", "pan", "chi"]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aacea8416665209d53",
            "reaction": 1,
            "timeSpent": 1013,
            "userAnswer": ["red", "white"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa77bebed003fa6eb1",
            "reaction": 3,
            "timeSpent": 2234,
            "userAnswer":[{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aabfcfc4cfc1b29b62",
            "reaction": 4,
            "timeSpent": 1668,
            "userAnswer": ["1", "3"]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa7fe0695bfd409731",
            "reaction": 4,
            "timeSpent": 2096,
            "userAnswer": "Student Open Ended answer 9"
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aae3191722d9b42f22",
            "reaction": 5,
            "timeSpent": 246,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": true,
            "questionId": "569906aa283a7b45e6777a52",
            "reaction": 4,
            "timeSpent": 1025,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: true}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aab4d366e4ada0c67d",
            "reaction": 2,
            "timeSpent": 127,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          }),
          QuestionResult.create({
            "correct": false,
            "questionId": "569906aa9fa514e9304c0549",
            "reaction": 3,
            "timeSpent": 660,
            "userAnswer": [{id: "1", selection: false}, {id: "2", selection: true}, {id: "3", selection: false}]
          })
        ]
      })
    ];

    return {
      assessment: assessment,
      students: students,
      userResults: userResults
    };
  },

  setupController: function(controller, model){
    controller.set("assessment", model.assessment);
    controller.set("students", model.students);
    controller.set('userResults', model.userResults);
  }

});
