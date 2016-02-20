import Ember from 'ember';
import { HotSpotTextUtil } from 'gooru-web/utils/questions';
import { module, test } from 'qunit';

module('Unit | Utility | hot spot text');

// --------------- Hot Spot Text tests
test('Hot Spot Text - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({answers: Ember.A([])});
  let questionUtil = HotSpotTextUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('Hot Spot Text - getCorrectAnswer', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = HotSpotTextUtil.create({question: question});

  let correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.get("length"), 2, "Missing items");
  assert.deepEqual(correctAnswer[0], 2, "Incorrect answer at 0");
  assert.deepEqual(correctAnswer[1], 3, "Incorrect answer at 1");
});

test('Hot Spot Text - isAnswerChoiceCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = HotSpotTextUtil.create({question: question});

  assert.ok(questionUtil.isAnswerChoiceCorrect(2), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect(1), "Answer should not be correct");
});

test('Hot Spot Text - isCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = HotSpotTextUtil.create({question: question});

  let correctAnswer = [2, 3];
  assert.ok(questionUtil.isCorrect(correctAnswer), "Answer should be correct");

  let correctDifferentOrder = [3, 2];
  assert.ok(questionUtil.isCorrect(correctDifferentOrder), "Answer should be correct, even it is not in the same order");

  let incorrectAnswer = [1, 3];
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct");

  let incorrectLessOptions = [1];
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

test('Hot Spot Text - distribution', function (assert) {
  let questionUtil = HotSpotTextUtil.create({question: null});

  let distribution = questionUtil.distribution([
    [1, 2, 3, 5],
    [3, 1, 5, 2], //same as 1, different order
    [1, 4, 3, 6],
    [6, 2, 1, 3],
    [4, 1, 6, 3], //same as 3, different order
    [1, 2, 3, 5] //same as 1, different order
  ]);

  let answerKeys = distribution.map(function (item) {
    return item.get("key");
  }).toArray();
  let counts = distribution.map(function (item) {
    return item.get("count");
  }).toArray();

  let expectedKeys = ['1,2,3,5', '1,3,4,6', '1,2,3,6'];
  assert.deepEqual(answerKeys, expectedKeys, "Wrong answer keys");
  assert.deepEqual(counts, [3, 2, 1], "Wrong counts");
});

test('Hot Spot Text - answerKey', function (assert) {
  let questionUtil = HotSpotTextUtil.create({question: null});

  let key = questionUtil.answerKey([3, 1, 5, 2]);
  assert.equal(key, '1,2,3,5', "Wrong key");
});

test('Hot Spot Text - sameAnswer', function (assert) {
  let questionUtil = HotSpotTextUtil.create({question: null});

  let answerA = [3, 1, 5, 2];
  let answerB = [3, 2, 5, 1]; //same as 1, different order
  let answerC = [3, 1, 5]; //less options
  let answerD = [3, 1, 5, 4]; //different option, 4

  assert.ok(questionUtil.sameAnswer(answerA, answerB), "Answer should be the same even they have different order");
  assert.ok(!questionUtil.sameAnswer(answerA, answerC), "Answer should not be the same, it has less options");
  assert.ok(!questionUtil.sameAnswer(answerA, answerD), "Answer should not be the same, it has a different option");

});
