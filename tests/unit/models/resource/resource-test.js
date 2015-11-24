import Ember from 'ember';
import { moduleForModel, test } from 'ember-qunit';

moduleForModel('resource/resource', 'Unit | Model | resource/resource', {
  // Specify the other units that are required for this test.
  needs: [
    "model:resource/answer"
  ]
});

test('thumbnailUrl with no thumbnail', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "resourceFormat": "image"
  });

  assert.equal(model.get("thumbnailUrl"), "/assets/gooru/default-image.png", "Wrong url");
});

test('thumbnailUrl with thumbnail', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "thumbnail": "my-thumbnail-url-here",
    "resourceFormat": "image"
  });

  assert.equal(model.get("thumbnailUrl"), "my-thumbnail-url-here", "Wrong url");
});

test('isQuestion', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "resourceFormat": "question"
  });

  assert.ok(model.get("isQuestion"), "It should be question");
});

test('isMultipleChoice', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "MC"
  });

  assert.ok(model.get("isMultipleChoice"), "It should be multiple choice");
});

test('isMultipleAnswer', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "MA"
  });

  assert.ok(model.get("isMultipleAnswer"), "It should be multiple answer");
});

test('isTrueFalse', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "T/F"
  });

  assert.ok(model.get("isTrueFalse"), "It should be true/false");
});

test('isOpenEnded', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "OE"
  });

  assert.ok(model.get("isOpenEnded"), "It should be open ended");
});

test('isFIB', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "FIB"
  });

  assert.ok(model.get("isFIB"), "It should be fill in the blank");
});

test('isHotSpotText', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "HS_TXT"
  });

  assert.ok(model.get("isHotSpotText"), "It should be hot spot text");
});

test('isHotSpotImage', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "HS_IMG"
  });

  assert.ok(model.get("isHotSpotImage"), "It should be hot spot image");
});

test('isHotTextReorder', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "HT_RO"
  });

  assert.ok(model.get("isHotTextReorder"), "It should be hot text reorder");
});

test('isHotTextHighlight', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "questionType": "HT_HL"
  });

  assert.ok(model.get("isHotTextHighlight"), "It should be hot text high light");
});

test('isImageResource', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "resourceType": "image/png"
  });

  assert.ok(model.get("isImageResource"), "It should be image resource type");
});


test('isHotTextHighlightWord', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "options": {
      hotTextType: "word"
    }
  });

  assert.ok(model.get("isHotTextHighlightWord"), "It should be hot text word");
});

test('isHotTextHighlightSentence', function(assert) {
  assert.expect(1);
  let model = this.subject({
    "options": {
      hotTextType: "sentence"
    }
  });

  assert.ok(model.get("isHotTextHighlightSentence"), "It should be hot text sentence");
});

test('hasAnswers', function(assert) {
  assert.expect(1);

  let store = this.store();

  var answers = Ember.A();
  Ember.run(function () {
    answers.pushObject(store.createRecord("resource/answer", {id: 1}));
  });

  let model = this.subject({
    answers: answers
  });

  assert.ok(model.get("hasAnswers"), "It should have answers");
});



