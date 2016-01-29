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
  this.on('myOnAnswerChanged', function(question, answerValue) {
    //todo check for selected answer
    assert.equal(question.get("id"), 10, "Wrong question id");
    assert.equal(answerValue, false, "Wrong answer value");
  });

  this.on('myOnAnswerCompleted', function(question, answerValue) {
    //todo check for selected answer
    assert.equal(question.get("id"), 10, "Wrong question id");
    assert.equal(answerValue, false, "Wrong answer value");
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
  $component.find(".answer-choices .radio input[type=radio]:eq(1)").click();

});
