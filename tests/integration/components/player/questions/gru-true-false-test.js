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

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2
    });

  this.set('question', question);
  this.on('myOnAnswerChanged', function(question, answerId) {
    //todo check for selected answer
    assert.equal(question.get("id"), 10, "Wrong question id");
    assert.equal(answerId, false, "Wrong answer id");
  });

  this.on('myOnAnswerCompleted', function(question, answerId) {
    //todo check for selected answer
    assert.equal(question.get("id"), 10, "Wrong question id");
    assert.equal(answerId, false, "Wrong answer id");
  });

  this.render(hbs`{{player/questions/gru-true-false question=question
        onAnswerChanged="myOnAnswerChanged" onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find(".instructions"), "Missing instructions");
  assert.equal($component.find(".answer-choices .radio").length, 2, "Missing answer choices");
  assert.equal($component.find(".answer-choices .radio input[type=radio]").length, 2, "Missing answer choices radio inputs");
  assert.equal(T.text($component.find(".answer-choices .radio:eq(0)")), "True", "Incorrect Message");
  assert.equal(T.text($component.find(".answer-choices .radio:eq(1)")), "False", "Incorrect Message");
  //select a radio button
  $component.find(".answer-choices .radio input[type=radio]:eq(1)").click();

});
