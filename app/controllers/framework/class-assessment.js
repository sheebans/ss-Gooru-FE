import Ember from 'ember';

export default Ember.Controller.extend({

  // TODO: Get this objects dynamically from the route

  collection: Ember.Object.create({

    collectionType: 'assessment',
    title: 'Sample Assessment Name',

    // Will this value be the same as questionCount
    // if there are only questions in the collection?
    resourceCount: 3,
    questionCount: 3,
    visibility: true,
    resources: [
      Ember.Object.create({
        "id": "56a120483b6e7b090501d3e7",
        "assetBasePath": "http://",
        "resourceType": "assessment-question",
        "resourceFormat": "question",
        "narration": "Amet elit deserunt cillum occaecat ut velit culpa fugiat. Dolor magna deserunt incididunt anim irure. Eiusmod laboris ipsum ullamco minim esse voluptate. Aute eiusmod ut consectetur voluptate. Sunt aliqua cillum commodo quis aliqua consequat sit et esse dolore reprehenderit esse est id.",
        "order": 1,
        "questionType": "MA",
        "text": "Qui aliquip Lorem magna veniam ut nisi. Nostrud elit cupidatat dolore mollit ad dolore esse dolore in eu laboris. Culpa esse fugiat fugiat consectetur proident.",
        "hints": [
          {
            "hintId": "5f1f4d45-84af-4e60-8b8d-7cb6f684da45",
            "hintText": "<p>Ut pariatur nisi laboris laboris esse eiusmod enim velit veniam pariatur ipsum pariatur.</p>",
            "sequence": 1
          },
          {
            "hintId": "1b2bac89-b9e9-4674-add5-ea23b312d337",
            "hintText": "<p>Aliqua eu laborum non elit deserunt anim ad labore elit deserunt est.</p>",
            "sequence": 2
          }
        ],
        "explanation": "<p>Labore pariatur ut adipisicing dolore. In consequat ea occaecat nisi.</p>",
        "answers": [
          {
            "answerId": "581fd094-9171-46d1-a54b-798b3018c3fc",
            "answerText": "<p>irure dolore</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 1
          },
          {
            "answerId": "ef8d3a8e-e06f-4f30-abc5-48ea06ed941d",
            "answerText": "<p>eiusmod eiusmod</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 2
          },
          {
            "answerId": "3ba5dbc9-17cf-4e00-bd7c-006054f1f0bb",
            "answerText": "<p>reprehenderit culpa</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 3
          },
          {
            "answerId": "69b00564-ae07-4d85-8843-efcd5d71d294",
            "answerText": "<p>consequat fugiat</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 4
          },
          {
            "answerId": "7a26cab2-8404-44b0-b127-10c4fe0ed866",
            "answerText": "<p>deserunt nisi</p>",
            "answerType": "text",
            "isCorrect": true,
            "sequence": 5
          }
        ],
        "hasAnswers": true,
        "hasNarration": true
      }),
      Ember.Object.create({
        "id": "56a1204886b2e565e1b2c230",
        "assetBasePath": "http://",
        "resourceType": "assessment-question",
        "resourceFormat": "question",
        "narration": "Est sunt nulla aliquip commodo qui nulla nisi nostrud reprehenderit laboris voluptate Lorem. Elit eu exercitation ea excepteur nostrud nisi incididunt pariatur sit eiusmod pariatur aute. Incididunt ad quis commodo consectetur eiusmod laboris do occaecat id enim adipisicing proident commodo qui.",
        "order": 2,
        "questionType": "MA",
        "text": "Ea enim cupidatat commodo aliqua eiusmod dolore. Commodo veniam fugiat mollit in do voluptate pariatur. Sint reprehenderit dolor excepteur ex veniam nisi consectetur. Fugiat ea labore pariatur aute voluptate. Amet pariatur incididunt laborum ad veniam.",
        "hints": [
          {
            "hintId": "5f1f4d45-84af-4e60-8b8d-7cb6f684da45",
            "hintText": "<p>Ut pariatur nisi laboris laboris esse eiusmod enim velit veniam pariatur ipsum pariatur.</p>",
            "sequence": 1
          },
          {
            "hintId": "1b2bac89-b9e9-4674-add5-ea23b312d337",
            "hintText": "<p>Aliqua eu laborum non elit deserunt anim ad labore elit deserunt est.</p>",
            "sequence": 2
          }
        ],
        "explanation": "<p>Reprehenderit mollit nostrud sunt nisi adipisicing. Et do cillum reprehenderit exercitation cupidatat duis eiusmod sunt.</p>",
        "answers": [
          {
            "answerId": "581fd094-9171-46d1-a54b-798b3018c3fc",
            "answerText": "<p>irure dolore</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 1
          },
          {
            "answerId": "ef8d3a8e-e06f-4f30-abc5-48ea06ed941d",
            "answerText": "<p>eiusmod eiusmod</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 2
          },
          {
            "answerId": "3ba5dbc9-17cf-4e00-bd7c-006054f1f0bb",
            "answerText": "<p>reprehenderit culpa</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 3
          },
          {
            "answerId": "69b00564-ae07-4d85-8843-efcd5d71d294",
            "answerText": "<p>consequat fugiat</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 4
          },
          {
            "answerId": "7a26cab2-8404-44b0-b127-10c4fe0ed866",
            "answerText": "<p>deserunt nisi</p>",
            "answerType": "text",
            "isCorrect": true,
            "sequence": 5
          }
        ],
        "hasAnswers": true,
        "hasNarration": true
      }),
      Ember.Object.create({
        "id": "56a12048ddee2022a741356a",
        "assetBasePath": "http://",
        "resourceType": "assessment-question",
        "resourceFormat": "question",
        "narration": "Reprehenderit eu laboris esse duis id Lorem pariatur Lorem. Et proident pariatur anim non eu laborum cillum irure esse do exercitation. Qui ipsum excepteur enim anim occaecat commodo veniam. Velit minim sunt sunt pariatur nulla eu culpa velit. Voluptate labore elit enim proident adipisicing laboris aliquip dolore eiusmod. Elit aliquip amet laboris proident nisi adipisicing. Et nisi dolor consectetur anim.",
        "order": 3,
        "questionType": "MA",
        "text": "Adipisicing occaecat officia amet fugiat excepteur Lorem magna incididunt culpa dolore. Culpa qui nostrud cillum sit quis tempor anim. Aute consectetur cupidatat aliqua nostrud qui incididunt mollit exercitation cillum duis sint id officia. Fugiat aliqua commodo et minim officia sunt exercitation velit occaecat. Aliquip consequat ea commodo duis esse et nostrud eiusmod. Ut commodo irure commodo ex exercitation exercitation. Enim enim labore ea incididunt.",
        "hints": [
          {
            "hintId": "5f1f4d45-84af-4e60-8b8d-7cb6f684da45",
            "hintText": "<p>Ut pariatur nisi laboris laboris esse eiusmod enim velit veniam pariatur ipsum pariatur.</p>",
            "sequence": 1
          },
          {
            "hintId": "1b2bac89-b9e9-4674-add5-ea23b312d337",
            "hintText": "<p>Aliqua eu laborum non elit deserunt anim ad labore elit deserunt est.</p>",
            "sequence": 2
          }
        ],
        "explanation": "<p>Sit qui esse fugiat dolore aute anim dolor eiusmod eu proident laborum elit. Ipsum laborum non dolor voluptate cillum esse nulla aliqua est ex voluptate ad.</p>",
        "answers": [
          {
            "answerId": "581fd094-9171-46d1-a54b-798b3018c3fc",
            "answerText": "<p>irure dolore</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 1
          },
          {
            "answerId": "ef8d3a8e-e06f-4f30-abc5-48ea06ed941d",
            "answerText": "<p>eiusmod eiusmod</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 2
          },
          {
            "answerId": "3ba5dbc9-17cf-4e00-bd7c-006054f1f0bb",
            "answerText": "<p>reprehenderit culpa</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 3
          },
          {
            "answerId": "69b00564-ae07-4d85-8843-efcd5d71d294",
            "answerText": "<p>consequat fugiat</p>",
            "answerType": "text",
            "isCorrect": false,
            "sequence": 4
          },
          {
            "answerId": "7a26cab2-8404-44b0-b127-10c4fe0ed866",
            "answerText": "<p>deserunt nisi</p>",
            "answerType": "text",
            "isCorrect": true,
            "sequence": 5
          }
        ],
        "hasAnswers": true,
        "hasNarration": true
      })
    ],
    hasResources: true,
    isAssessment: true
  }),

  users: [
    Ember.Object.create({
      "id": "56983a9060a68052c1ed934c",
      "fullName": "Rocha, Perez"
    }),
    Ember.Object.create({
      "id": "56983a90fb01fecc328e2388",
      "fullName": "Snyder, Mason"
    }),
    Ember.Object.create({
      "id": "56983a906596902edadedc7c",
      "fullName": "Robles, María Guadalupe de la Trinidad"
    }),
    Ember.Object.create({
      "id": "56983a9082f705e65f2fe607",
      "fullName": "Hutchinson, Blake"
    })
  ]

});
