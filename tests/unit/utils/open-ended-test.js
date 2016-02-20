import Ember from 'ember';
import { OpenEndedUtil } from 'gooru-web/utils/questions';
import { module, test } from 'qunit';

module('Unit | Utility | open ended');

// --------------- Open Ended tests
test('Open Ended - getCorrectAnswer no correct answer provided', function (assert) {
  let question = Ember.Object.create({});
  let questionUtil = OpenEndedUtil.create({question: question});
  assert.ok(!questionUtil.getCorrectAnswer(), "OE always return false");
});

test('Open Ended - isCorrect', function (assert) {
  let question = Ember.Object.create({});
  let questionUtil = OpenEndedUtil.create({question: question});

  assert.ok(questionUtil.isCorrect("any text"), "OE answers are always correct");
  assert.ok(questionUtil.isCorrect("any other"), "OE answers are always correc");
});

test('Open Ended - distribution', function (assert) {
  let questionUtil = OpenEndedUtil.create({question: null});

  let distribution = questionUtil.distribution(["text1", "text2", "text3"]);

  let keys = distribution.map(function (item) {
    return item.get("key");
  }).toArray();
  let counts = distribution.map(function (item) {
    return item.get("count");
  }).toArray();

  assert.deepEqual(keys, ["text1", "text2", "text3"], "Wrong keys");
  assert.deepEqual(counts, [1, 1, 1], "Wrong counts");
});

test('Open Ended - answerKey', function (assert) {
  let questionUtil = OpenEndedUtil.create({question: null});

  let key = questionUtil.answerKey("any text");
  assert.equal(key, "any text", "Wrong key");
});
