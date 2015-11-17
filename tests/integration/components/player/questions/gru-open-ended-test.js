import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('player/questions/gru-open-ended', 'Integration | Component | player/questions/gru open ended', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale", "en");
  }

});

test('Open ended layout', function (assert) {

  assert.expect(4);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2
    });

  this.set('question', question);
  this.render(hbs`{{player/questions/gru-open-ended question=question}}`);

  var $component = this.$(); //component dom element
  T.exists(assert, $component.find(".instructions"), "Missing instructions");
  T.exists(assert, $component.find("textarea"), "Missing textarea");
  T.exists(assert, $component.find(".help-block span"), "Missing character limit");
  assert.equal($component.find(".help-block span").text(), "1000", "Initial character limit should be 1000");
});


test('Open ended enter response', function (assert) {

  assert.expect(5);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2
    });

  this.set('question', question);
  this.on('myOnAnswerChanged', function(question, answer) {
    assert.equal(question.get("id"), 10, "Wrong question id for onAnswerCompleted");
    assert.equal(answer, "test", "Wrong answer for onAnswerCompleted");
  });

  this.on('myOnAnswerCompleted', function(question, answer) {
    assert.equal(question.get("id"), 10, "Wrong question id for onAnswerCompleted");
    assert.equal(answer, "test", "Wrong answer for onAnswerCompleted");
  });

  this.on('myOnAnswerCleared', function() {
    assert.ok(false, "This shouldn't be called");
  });

  this.render(hbs`{{player/questions/gru-open-ended question=question
        onAnswerChanged="myOnAnswerChanged"
        onAnswerCleared="myOnAnswerCleared"
        onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(); //component dom element
  //enter response
  $component.find("textarea").val("test");
  $component.find("textarea").change();
  assert.equal($component.find(".help-block span").text(), "996", "Character limit should be 996");
});

test('Open ended clear response', function (assert) {

  assert.expect(5);

  const question = Ember.Object.create(
    {
      "id": 10,
      "order": 2
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
    assert.equal(answer, "", "Wrong answer for onAnswerCleared");
  });

  this.render(hbs`{{player/questions/gru-open-ended question=question
        onAnswerChanged="myOnAnswerChanged"
        onAnswerCleared="myOnAnswerCleared"
        onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(); //component dom element
  //enter response
  $component.find("textarea").val("test");
  $component.find("textarea").change();
  assert.equal($component.find(".help-block span").text(), "996", "Character limit should be 996");

  //clear response
  $component.find("textarea").val("");
  $component.find("textarea").change();
  assert.equal($component.find(".help-block span").text(), "1000", "Character limit should be 1000");
});
