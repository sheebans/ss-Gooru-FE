import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import QuestionResult from 'gooru-web/models/result/question';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('reports/class-assessment/gru-questions-detail', 'Integration | Component | reports/class assessment/gru questions detail', {
  integration: true
});

test('Layout', function(assert) {
  const selectedQuestion = Ember.Object.create({ //Multiple Choice
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
  });

  var assessment = Ember.Object.create({
    resources: [
      selectedQuestion,
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
      })
    ]
  });

  var students = Ember.A([
    Ember.Object.create({"id": "56983a9060a68052c1ed934c"}),
    Ember.Object.create({"id": "56983a90fb01fecc328e2388"}),
    Ember.Object.create({"id": "56983a906596902edadedc7c"})
  ]);

  var reportData = { //all questions not started
    "56983a9060a68052c1ed934c": {
      "56a120483b6e7b090501d3e7": QuestionResult.create( { notStarted: true }),
      "56a1204886b2e565e1b2c230": QuestionResult.create( { notStarted: true }),
      "56a12048ddee2022a741356a": QuestionResult.create( { notStarted: true })
    },
    "56983a90fb01fecc328e2388": {
      "56a120483b6e7b090501d3e7": QuestionResult.create( { notStarted: true }),
      "56a1204886b2e565e1b2c230": QuestionResult.create( { notStarted: true }),
      "56a12048ddee2022a741356a": QuestionResult.create( { notStarted: true })
    },
    "56983a906596902edadedc7c": {
      "56a120483b6e7b090501d3e7": QuestionResult.create( { notStarted: true }),
      "56a1204886b2e565e1b2c230": QuestionResult.create( { notStarted: true }),
      "56a12048ddee2022a741356a": QuestionResult.create( { notStarted: true })
    }
  };
  var model =Ember.Object.create({
    selectedQuestion,
    assessment,
    students,
    reportData
  });

  this.set("model", model);


  this.render(hbs`{{reports/class-assessment/gru-questions-detail model=model }}`);

  const $component = this.$();
  const $header = $component.find(".modal-header");
  T.exists(assert, $header, "Missing header");
  T.exists(assert, $header.find(".close"), "Missing close button");

  const $navigation = $component.find(".navigation");
  T.exists(assert, $navigation, "Missing navigation");
  T.exists(assert, $navigation.find(".gru-bubbles"), "Missing navigation bubbles");
  assert.equal($navigation.find(".gru-bubbles .bubble").length, 3, "Wrong number of questions");

  T.exists(assert, $navigation.find(".selected-question"), "Missing navigation bubbles");
  assert.ok($navigation.find(".gru-bubbles .bubble:eq(0)").hasClass("selected"), "First question should be selected");

  T.exists(assert, $component.find(".body .question-info"), "Missing question information panel");
  T.exists(assert, $component.find(".body .question-metrics"), "Missing question metrics panel");
});

