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
  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text":"El _______ es amarillo. La luna es_______ "
    });
  this.set('question', question);
  this.render(hbs`{{player/questions/gru-fib question=question}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find(".instructions"), "Missing instructions");
  T.exists(assert, $component.find(".fib-answers"), "Missing fill in the blanks answers");
  assert.equal($component.find(".fib-answers input").length,2, "Incorrect number of inputs");

});

test('Fill in the blanks', function(assert) {
  assert.expect(6);
  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2,
      "text":"El _______ es amarillo. La luna es_______ "
    });
  this.set('question', question);
  this.on('myOnAnswerChanged', function() {
    assert.ok(true, "This should be called twice");
  });

  this.on('myOnAnswerCompleted', function() {
    assert.ok(true, "This should be called once");
  });

  this.on('myOnAnswerCleared', function(question, answer) {
    assert.equal(question.get("id"), 10, "Wrong question id for onAnswerCleared");
    assert.equal(answer[0], "", "Wrong answer for onAnswerCleared");
    assert.equal(answer[1], "", "Wrong answer for onAnswerCleared");
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
