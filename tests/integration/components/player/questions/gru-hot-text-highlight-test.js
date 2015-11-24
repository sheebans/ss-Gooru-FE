import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/questions/gru-hot-text-highlight', 'Integration | Component | player/questions/gru hot text highlight', {
  integration: true
});

test('Layout', function(assert) {
  assert.expect(4);

  var answers = Ember.A([ Ember.Object.create({ text: "Sentence 1 [Sentence 2.] Sentence 3 [Sentence 4.] Sentence 5" }) ]),
    question = Ember.Object.create({
      answers: answers,
      hasAnswers: true,
      isHotTextHighlightWord: false
    });

  this.set("question", question);

  this.render(hbs`{{player/questions/gru-hot-text-highlight question=question}}`);

  var $component = this.$(), //component dom element
    $phrasesContainer = $component.find(".phrases");

  assert.ok($component.find(".instructions"), "Missing instructions");
  assert.ok($component.find(".phrases"), "Missing phrases");
  assert.equal($phrasesContainer.find("span.item").length, 5, "Incorrect number of sentences");
  assert.equal($phrasesContainer.find("span.item.selected").length, 0, "Incorrect number of sentences selected");
});

test('markItem', function(assert) {
  assert.expect(14);

  var answers = Ember.A([ Ember.Object.create({ text: "Sentence 1 [Sentence 2.] Sentence 3 [Sentence 4.] Sentence 5" }) ]),
    question = Ember.Object.create({
      id: 10,
      answers: answers,
      hasAnswers: true,
      isHotTextHighlightWord: false
    });

  this.set("question", question);
  this.on('myOnAnswerChanged', function() {
    assert.ok(true, "This should be called 4 times");
  });

  this.on('myOnAnswerCompleted', function() {
    assert.ok(true, "This should be called 3 times");
  });

  this.on('myOnAnswerCleared', function() {
    assert.ok(true, "This should be called 1 time");
  });

  this.render(hbs`{{player/questions/gru-hot-text-highlight
        question=question
        onAnswerChanged="myOnAnswerChanged"
        onAnswerCleared="myOnAnswerCleared"
        onAnswerCompleted="myOnAnswerCompleted"}}`);

  var $component = this.$(), //component dom element
    $phrasesContainer = $component.find(".phrases"),
    $item0 = $phrasesContainer.find("span.item:eq(0)"),
    $item1 = $phrasesContainer.find("span.item:eq(1)");

  //selecting items
  $item0.click();
  $item1.click();
  assert.ok($item0.hasClass("selected"), "Item 0 should be selected");
  assert.ok($item1.hasClass("selected"), "Item 1 should be selected");

  //deselecting items
  $item0.click();
  assert.ok(!$item0.hasClass("selected"), "Item 0 should not be selected");
  assert.ok($item1.hasClass("selected"), "Item 1 should be selected");

  $item1.click();
  assert.ok(!$item0.hasClass("selected"), "Item 0 should not be selected");
  assert.ok(!$item1.hasClass("selected"), "Item 1 should not be selected");

});
