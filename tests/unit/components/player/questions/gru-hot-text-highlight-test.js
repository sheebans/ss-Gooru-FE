import Ember from "ember";
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('player/questions/gru-hot-text-highlight', 'Unit | Component | player/questions/gru hot text highlight', {
  integration: false
});

test('getWordItems', function (assert) {
  assert.expect(5);

  var component = this.subject();

  //with no words
  var wordItems = component.getWordItems("").toArray();
  assert.equal(wordItems.length, 0, "Wrong number of items");

  //with one word
  wordItems = component.getWordItems("text").toArray();
  assert.equal(wordItems.length, 1, "Wrong number of items");
  assert.equal(wordItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(wordItems[0].get("text"), "text", "Wrong text for first object");

  //with many words
  wordItems = component.getWordItems("  A  phrase with  many words and extra spaces   ").toArray();
  assert.equal(wordItems.length, 8, "Wrong number of items");
});

test('getSentenceItems', function (assert) {
  assert.expect(16);

  var component = this.subject();

  //with no text
  var sentenceItems = component.getSentenceItems("").toArray();
  assert.equal(sentenceItems.length, 0, "Wrong number of items");

  //with no correct
  sentenceItems = component.getSentenceItems("Sentence 1").toArray();
  assert.equal(sentenceItems.length, 1, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");

  //with many sentences, 1 correct
  sentenceItems = component.getSentenceItems("Sentence 1 [Sentence 2.] Sentence 3").toArray();
  assert.equal(sentenceItems.length, 3, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");
  assert.equal(sentenceItems[1].get("text"), "Sentence 2.", "Wrong text for second object");
  assert.equal(sentenceItems[2].get("text"), "Sentence 3", "Wrong text for third object");

  //with many sentences, many correct
  sentenceItems = component.getSentenceItems("Sentence 1 [Sentence 2.] Sentence 3 [Sentence 4.] Sentence 5");
  assert.equal(sentenceItems.length, 5, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");
  assert.equal(sentenceItems[1].get("text"), "Sentence 2.", "Wrong text for second object");
  assert.equal(sentenceItems[2].get("text"), "Sentence 3", "Wrong text for third object");
  assert.equal(sentenceItems[3].get("text"), "Sentence 4.", "Wrong text for fourth object");
  assert.equal(sentenceItems[4].get("text"), "Sentence 5", "Wrong text for fifth object");

});

test('toItems', function (assert) {
  assert.expect(6);

  var component = this.subject();
  var items = Ember.A(["  ", "", "Item 1", " Item 2 ", "[Item 3]"]);

  var convertedItems = component.toItems(items).toArray();
  assert.equal(convertedItems.length, 3, "Should have 3 items, empty items are excluded");
  assert.equal(convertedItems[0].get("id"), 2, "Invalid id, it should have the original index id");
  assert.equal(convertedItems[0].get("text"), "Item 1", "Wrong item text");
  assert.equal(convertedItems[0].get("selected"), false, "Wrong item selected value");
  assert.equal(convertedItems[1].get("text"), "Item 2", "Wrong item text, text should be trimmed");
  assert.equal(convertedItems[2].get("text"), "Item 3", "Wrong item text, [] should be suppressed");
});

test('generateItems isHotTextHighlightWord', function (assert) {
  assert.expect(5);
  var answers = Ember.A([ Ember.Object.create({ text: "Many [correct] items in this sentence [another]" }) ]),
    question = Ember.Object.create({
      answers: answers,
      hasAnswers: true,
      isHotTextHighlightWord: true
    });

  var component = this.subject({
    question: question
  });

  component.generateItems();

  var items = component.get("items").toArray();

  assert.equal(items.length, 7, "Missing items");
  assert.equal(items[0].get("id"), 0, "Invalid id");
  assert.equal(items[0].get("text"), "Many", "Wrong item text");
  assert.equal(items[0].get("selected"), false, "Wrong item selected value");
  assert.equal(items[1].get("text"), "correct", "Wrong item text");
});

test('generateItems isHotTextHighlightSentence', function (assert) {
  assert.expect(5);
  var answers = Ember.A([ Ember.Object.create({ text: "Sentence 1 [Sentence 2.] Sentence 3 [Sentence 4.] Sentence 5" }) ]),
    question = Ember.Object.create({
      answers: answers,
      hasAnswers: true,
      isHotTextHighlightWord: false
    });

  var component = this.subject({
    question: question
  });

  component.generateItems();

  var items = component.get("items").toArray();

  assert.equal(items.length, 5, "Missing items");
  assert.equal(items[0].get("id"), 0, "Invalid id");
  assert.equal(items[0].get("text"), "Sentence 1", "Wrong item text");
  assert.equal(items[0].get("selected"), false, "Wrong item selected value");
  assert.equal(items[1].get("text"), "Sentence 2.", "Wrong item text");
});

test('transformText', function (assert) {
  assert.expect(4);
  var component = this.subject();

  //removing wrapping <p> tag for a normal text
  var text = component.transformText("<p> This is a test [for] the transform text </p>");
  assert.equal(text, "This is a test [for] the transform text", "Wrong text");

  //removing wrapping <p> tag for a text having more html tag inside
  text = component.transformText("<p> This is a test [<p>for</p>] <b>the</b> transform text </p>");
  assert.equal(text, "This is a test [<p>for</p>] <b>the</b> transform text");

  //ignoring a text not having a wrapping <p> tag, but <p> tags inside
  text = component.transformText("This is a test [<p>for</p>] <b>the</b> transform text");
  assert.equal(text, "This is a test [<p>for</p>] <b>the</b> transform text");

  //ignoring a text a starting <p> tag which, but not wrapping the whole text
  text = component.transformText("<p>This is a test</p> [<p>for</p>] <b>the</b> transform text");
  assert.equal(text, "<p>This is a test</p> [<p>for</p>] <b>the</b> transform text");
});

