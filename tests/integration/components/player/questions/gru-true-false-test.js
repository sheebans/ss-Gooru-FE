import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/questions/gru-true-false', 'Integration | Component | player/questions/gru true false', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});

test('True or false question layout', function (assert) {

  assert.expect(9);

  let question = Ember.Object.create({ //true false
    "id": "569906aa3ec3bb39969acbe6",
    questionType: 'T/F',
    text: 'True False Question',
    hints: [],
    explanation: 'Sample explanation text',
    answers: Ember.A([
      Ember.Object.create({id: "1", isCorrect: true, text: "True"}),
      Ember.Object.create({id: "2", isCorrect: false, text: "False"}),
    ]),
    "resourceType": "assessment-question",
    "resourceFormat": "question",
    "order": 2,
    "hasAnswers": true
  });

  let answers = [];
  this.set('question', question);
  this.on('myOnAnswerChanged', function (question, stats) {
    //called 2 times
    assert.deepEqual(stats, answers, "Answer changed, but the answers are not in the correct order");
  });

  this.on('myOnAnswerCompleted', function (question, stats) {
    //called 2 times
    assert.deepEqual(stats, answers, "Answer changed, but the answers are not in the correct order");
  });

  this.render(hbs`{{player/questions/gru-true-false question=question
        onAnswerChanged="myOnAnswerChanged" onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find(".instructions"), "Missing instructions");
  assert.equal($component.find(".answer-choices .radio").length, 2, "Missing answer choices");
  assert.equal($component.find(".answer-choices .radio input[type=radio]").length, 2, "Missing answer choices radio inputs");
  assert.equal($component.find(".answer-choices .radio:eq(0)").text().trim(), "(A)True", "Incorrect Message");
  assert.equal($component.find(".answer-choices .radio:eq(1)").text().trim(), "(B)False", "Incorrect Message");

  //select a radio button
  answers = { answer: "2", correct: false };
  $component.find(".answer-choices .radio input[type=radio]:eq(1)").click();

  answers = { answer: "1", correct: true };
  $component.find(".answer-choices .radio input[type=radio]:eq(0)").click();

});
