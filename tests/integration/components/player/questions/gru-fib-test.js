import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/questions/gru-fib', 'Integration | Component | player/questions/gru fib', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }
});

test('Fill in the blanks layout', function(assert) {
  assert.expect(3);
  const question = Ember.Object.create({
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
  });

  this.set('question', question);
  this.render(hbs`{{player/questions/gru-fib question=question}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find(".instructions"), "Missing instructions");
  T.exists(assert, $component.find(".fib-answers"), "Missing fill in the blanks answers");
  assert.equal($component.find(".fib-answers input").length,2, "Incorrect number of inputs");

});

test('Fill in the blanks', function(assert) {
  assert.expect(7);
  const question = Ember.Object.create({
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
  });

  this.set('question', question);
  this.on('myOnAnswerChanged', function() {
    assert.ok(true, "This should be called twice");
  });

  this.on('myOnAnswerCompleted', function() {
    assert.ok(true, "This should be called once");
  });

  this.on('myOnAnswerCleared', function(question, stats) {
    assert.equal(question.get("id"), "569906aacea8416665209d53", "Wrong question id for onAnswerCleared");
    assert.ok(!stats.correct, "Correct should be false");

    let answer = stats.answer;
    assert.equal(answer[0], "", "Wrong answer 1 onAnswerCleared");
    assert.equal(answer[1], "", "Wrong answer 2 onAnswerCleared");
  });
  this.render(hbs`{{player/questions/gru-fib question=question
        onAnswerChanged="myOnAnswerChanged"
        onAnswerCleared="myOnAnswerCleared"
        onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(); //component dom element
  //enter response
  $component.find(".fib-answers input").first().val("test");
  $component.find(".fib-answers input").first().keyup();
  //clear response
  $component.find(".fib-answers input").first().val("");
  $component.find(".fib-answers input").first().keyup();
});
