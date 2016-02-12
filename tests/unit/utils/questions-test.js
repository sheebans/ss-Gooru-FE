import Ember from 'ember';
import {
  MultipleChoiceUtil, MultipleAnswerUtil, TrueFalseUtil, OpenEndedUtil,
  FillInTheBlankUtil, ReorderUtil, HotSpotImageUtil, HotSpotTextUtil, HotTextHighlightUtil
} from 'gooru-web/utils/questions';
import { module, test } from 'qunit';

module('Unit | Utility | questions');

// --------------- Multiple Choice tests
test('Multiple Choice - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({answers: Ember.A([])});
  let questionUtil = MultipleChoiceUtil.create({question: question});
  assert.ok(!questionUtil.getCorrectAnswer(), "Correct answer should not be found");
});

test('Multiple Choice - getCorrectAnswer no correct answer provided', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = MultipleChoiceUtil.create({question: question});
  assert.ok(!questionUtil.getCorrectAnswer(), "Correct answer should not be found");
});

test('Multiple Choice - getCorrectAnswer when correct answer is provided', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = MultipleChoiceUtil.create({question: question});
  assert.equal(questionUtil.getCorrectAnswer(), 2, "Incorrect answer id");
});

test('Multiple Choice - isCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = MultipleChoiceUtil.create({question: question});

  assert.ok(!questionUtil.isCorrect(1), "Option one is not correct");
  assert.ok(questionUtil.isCorrect(2), "Option two should be correct");
});

test('Multiple Choice - distribution', function (assert) {
  let questionUtil = MultipleChoiceUtil.create({question: null});

  let distribution = questionUtil.distribution([1, 1, 2, 3, 4, 3, 2, 3]);

  let answers = distribution.map(function(item) { return item.get("answer"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  assert.deepEqual(answers, [1,2,3,4], "Wrong answers");
  assert.deepEqual(counts, [2,2,3,1], "Wrong counts");
});

test('Multiple Choice - answerKey', function (assert) {
  let questionUtil = MultipleChoiceUtil.create({question: null});

  let key = questionUtil.answerKey(1);
  assert.equal(key, 1, "Wrong key");
});

test('Multiple Choice - sameAnswer', function (assert) {
  let questionUtil = MultipleChoiceUtil.create({question: null});
  assert.ok(questionUtil.sameAnswer(1, 1), "Answer should be the same");
  assert.ok(!questionUtil.sameAnswer(1, 2), "Answer should not be the same");
});

// --------------- Multiple Answer tests
test('Multiple Answer - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({answers: Ember.A([])});
  let questionUtil = MultipleAnswerUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('Multiple Answer - getCorrectAnswer', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = MultipleAnswerUtil.create({question: question});

  let correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.get("length"), 3, "Missing items");
  assert.deepEqual(correctAnswer[0], {id: 1, selection: false}, "Incorrect answer at 0");
  assert.deepEqual(correctAnswer[1], {id: 2, selection: true}, "Incorrect answer at 1");
  assert.deepEqual(correctAnswer[2], {id: 3, selection: true}, "Incorrect answer at 2");
});

test('Multiple Answer - isAnswerChoiceCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = MultipleAnswerUtil.create({question: question});

  assert.ok(questionUtil.isAnswerChoiceCorrect({id: 1, selection: false}), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect({id: 3, selection: false}), "Answer should not be correct");
});

test('Multiple Answer - isCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = MultipleAnswerUtil.create({question: question});

  let correctAnswer = Ember.A([{id: 1, selection: false}, {id: 2, selection: true}, {id: 3, selection: true}]);
  assert.ok(questionUtil.isCorrect(correctAnswer), "Answer should be correct");

  let correctDifferentOrder = Ember.A([{id: 3, selection: true}, {id: 1, selection: false}, {id: 2, selection: true}]);
  assert.ok(questionUtil.isCorrect(correctDifferentOrder), "Answer should be correct, even it is not in the same order");

  let incorrectAnswer = Ember.A([{id: 3, selection: false}, {id: 1, selection: false}, {id: 2, selection: true}]);
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct");

  let incorrectLessOptions = Ember.A([{id: 1, selection: false}, {id: 2, selection: true}]);
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

test('Multiple Answer - answerKey', function (assert) {
  let questionUtil = MultipleAnswerUtil.create({ question: null });

  let key = questionUtil.answerKey([{id: 1, selection: false}, {id: 2, selection: true}, {id: 3, selection: true}]);
  assert.equal(key, "1_false,2_true,3_true", "Wrong key for answerA");

  //trying different order
  key = questionUtil.answerKey([{id: 1, selection: false}, {id: 3, selection: true}, {id: 2, selection: true}]);
  assert.equal(key, "1_false,2_true,3_true", "Wrong key for answerB");
});

test('Multiple Answer - sameAnswer', function (assert) {
  let questionUtil = MultipleAnswerUtil.create({ question: null });

  let answerA = [{id: 1, selection: false}, {id: 2, selection: true}, {id: 3, selection: true}];
  let answerB = [{id: 1, selection: false}, {id: 3, selection: true}, {id: 2, selection: true}]; //same as 1, different order
  let answerC = [{id: 1, selection: false}, {id: 3, selection: false}, {id: 2, selection: false}];

  assert.ok(questionUtil.sameAnswer(answerA, answerB), "They should be the same even the order is different");
  assert.ok(!questionUtil.sameAnswer(answerB, answerC), "They should not be the same");

});

test('Multiple Answer - distribution', function (assert) {
  let questionUtil = MultipleAnswerUtil.create({ question: null });

  let distribution = questionUtil.distribution([
    [{id: 1, selection: false}, {id: 2, selection: false}, {id: 3, selection: false}],
    [{id: 1, selection: false}, {id: 2, selection: false}, {id: 3, selection: false}], //same as #1
    [{id: 1, selection: false}, {id: 2, selection: true}, {id: 3, selection: true}],
    [{id: 1, selection: false}, {id: 2, selection: false}, {id: 3, selection: true}],
    [{id: 2, selection: true}, {id: 1, selection: false}, {id: 3, selection: true}] //sames as #3 different order
  ]);

  let answerKeys = distribution.map(function(item) { return item.get("key"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  let expectedKeys = [ '1_false,2_false,3_false', '1_false,2_true,3_true', '1_false,2_false,3_true' ];
  assert.deepEqual(answerKeys, expectedKeys, "Wrong answer keys");
  assert.deepEqual(counts, [2,2,1], "Wrong counts");
});

// --------------- True False tests
test('True/False - getCorrectAnswer when correct answer is provided', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = TrueFalseUtil.create({question: question});
  assert.equal(questionUtil.getCorrectAnswer(), 2, "Incorrect answer id");
});

test('True/False - isCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = TrueFalseUtil.create({question: question});

  assert.ok(!questionUtil.isCorrect(1), "Option one is not correct");
  assert.ok(questionUtil.isCorrect(2), "Option two should be correct");
});

test('True/False - distribution', function (assert) {
  let questionUtil = TrueFalseUtil.create({question: null});

  let distribution = questionUtil.distribution([1, 1, 2, 2, 1, 2, 2, 2]);

  let answers = distribution.map(function(item) { return item.get("answer"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  assert.deepEqual(answers, [1,2], "Wrong answers");
  assert.deepEqual(counts, [3,5], "Wrong counts");
});

test('True/False - answerKey', function (assert) {
  let questionUtil = TrueFalseUtil.create({question: null});

  let key = questionUtil.answerKey(1);
  assert.equal(key, 1, "Wrong key");
});

test('True/False - sameAnswer', function (assert) {
  let questionUtil = TrueFalseUtil.create({question: null});
  assert.ok(questionUtil.sameAnswer(1, 1), "Answers should be the same");
  assert.ok(!questionUtil.sameAnswer(1, 2), "Answers should not be the same");
});


// --------------- FIB tests
test('FIB - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({answers: Ember.A([])});
  let questionUtil = FillInTheBlankUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('FIB - getCorrectAnswer', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, text: 'optionA'}),
    Ember.Object.create({id: 2, text: 'optionB'}),
    Ember.Object.create({id: 3, text: 'optionC'})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = FillInTheBlankUtil.create({question: question});

  let correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.get("length"), 3, "Missing items");
  assert.equal(correctAnswer[0], 'optionA', "Incorrect answer at 0");
  assert.equal(correctAnswer[1], 'optionB', "Incorrect answer at 1");
  assert.equal(correctAnswer[2], 'optionC', "Incorrect answer at 2");

});

test('FIB - isAnswerChoiceCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, text: 'optionA'}),
    Ember.Object.create({id: 2, text: 'optionB'}),
    Ember.Object.create({id: 3, text: 'optionC'})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = FillInTheBlankUtil.create({question: question});

  assert.ok(questionUtil.isAnswerChoiceCorrect("optionA", 0), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect("optionC", 1), "Answer should not be correct, optionC is at index 2");
  assert.ok(!questionUtil.isAnswerChoiceCorrect("optionD", 1), "Answer should not be correct, optionD is not valid");
});

test('FIB - isCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, text: 'optionA'}),
    Ember.Object.create({id: 2, text: 'optionB'}),
    Ember.Object.create({id: 3, text: 'optionC'})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = FillInTheBlankUtil.create({question: question});

  let correctAnswer = Ember.A(['optionA', 'optionB', 'optionC']);
  assert.ok(questionUtil.isCorrect(correctAnswer), "Answer should be correct");

  let correctDifferentOrder = Ember.A(['optionA', 'optionC', 'optionB']);
  assert.ok(!questionUtil.isCorrect(correctDifferentOrder), "Answer should not be correct, it has different order");

  let incorrectAnswer = Ember.A(['optionD', 'optionC', 'optionB']);
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct, optionD is not valid");

  let incorrectLessOptions = Ember.A(['optionA', 'optionB']);
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

test('FIB - distribution', function (assert) {
  let questionUtil = FillInTheBlankUtil.create({question: null});

  let distribution = questionUtil.distribution([
    ['black', 'white', 'blue'],
    ['black', 'white', 'blue'], //same as 1
    ['blue', 'orange', 'red'],
    ['black', 'white', 'red'],
    ['blue', 'orange', 'red'], //same as 3
    ['black', 'white', 'blue'] //same as 1 and 2
  ]);

  let answerKeys = distribution.map(function(item) { return item.get("key"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  let expectedKeys = [ "black,white,blue", "blue,orange,red", "black,white,red" ];
  assert.deepEqual(answerKeys, expectedKeys, "Wrong answer keys");
  assert.deepEqual(counts, [3,2,1], "Wrong counts");
});

test('FIB - answerKey', function (assert) {
  let questionUtil = FillInTheBlankUtil.create({question: null});

  let key = questionUtil.answerKey(['black', 'white', 'blue']);
  assert.equal(key, "black,white,blue", "Wrong key");
});

test('FIB - sameAnswer', function (assert) {
  let questionUtil = FillInTheBlankUtil.create({question: null});

  let answerA = ['black', 'white', 'blue'];
  let answerB = ['black', 'white', 'blue'];
  let answerC = ['white', 'black', 'blue']; //different order

  assert.ok(questionUtil.sameAnswer(answerA, answerB), "Answer should be the same");
  assert.ok(!questionUtil.sameAnswer(answerA, answerC), "Answer should not be the same, they have different order");
});

// --------------- Reorder tests
test('Reorder - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({answers: Ember.A([])});
  let questionUtil = ReorderUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('Reorder - getCorrectAnswer', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 'choice-1'}),
    Ember.Object.create({id: 'choice-2'}),
    Ember.Object.create({id: 'choice-3'})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = ReorderUtil.create({question: question});

  let correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.get("length"), 3, "Missing items");
  assert.equal(correctAnswer[0], 'choice-1', "Incorrect answer at 0");
  assert.equal(correctAnswer[1], 'choice-2', "Incorrect answer at 1");
  assert.equal(correctAnswer[2], 'choice-3', "Incorrect answer at 2");

});

test('Reorder - isAnswerChoiceCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 'choice-1'}),
    Ember.Object.create({id: 'choice-2'}),
    Ember.Object.create({id: 'choice-3'})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = ReorderUtil.create({question: question});

  assert.ok(questionUtil.isAnswerChoiceCorrect('choice-1', 0), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect('choice-3', 1), "Answer should not be correct, choice-3 is at index 2");
  assert.ok(!questionUtil.isAnswerChoiceCorrect('choice-4', 1), "Answer should not be correct, choice-4 is not valid");
});

test('Reorder - isCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 'choice-1'}),
    Ember.Object.create({id: 'choice-2'}),
    Ember.Object.create({id: 'choice-3'})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = ReorderUtil.create({question: question});

  let correctAnswer = ['choice-1', 'choice-2', 'choice-3'];
  assert.ok(questionUtil.isCorrect(correctAnswer), "Answer should be correct");

  let correctDifferentOrder = ['choice-3', 'choice-1', 'choice-2'];
  assert.ok(!questionUtil.isCorrect(correctDifferentOrder), "Answer should not be correct, it has different order");

  let incorrectAnswer = ['choice-1', 'choice-2', 'choice-4'];
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct, optionD is not valid");

  let incorrectLessOptions = ['choice-1', 'choice-2'];
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

test('Reorder - distribution', function (assert) {
  let questionUtil = ReorderUtil.create({question: null});

  let distribution = questionUtil.distribution([
    ['choice-1', 'choice-2', 'choice-3', 'choice-4'],
    ['choice-2', 'choice-3', 'choice-1', 'choice-4'],
    ['choice-1', 'choice-2', 'choice-3', 'choice-4'], //same as 1
    ['choice-2', 'choice-3', 'choice-1', 'choice-4'], //same as 2
    ['choice-4', 'choice-2', 'choice-3', 'choice-1'],
    ['choice-3', 'choice-2', 'choice-4', 'choice-1'],
    ['choice-2', 'choice-3', 'choice-1', 'choice-4'] //same as 2
  ]);

  let answerKeys = distribution.map(function(item) { return item.get("key"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  let expectedKeys = [
    "choice-1,choice-2,choice-3,choice-4", "choice-2,choice-3,choice-1,choice-4",
    "choice-4,choice-2,choice-3,choice-1", "choice-3,choice-2,choice-4,choice-1" ];
  assert.deepEqual(answerKeys, expectedKeys, "Wrong answer keys");
  assert.deepEqual(counts, [2,3,1,1], "Wrong counts");
});

test('Reorder - answerKey', function (assert) {
  let questionUtil = ReorderUtil.create({question: null});

  let key = questionUtil.answerKey(['choice-1', 'choice-2', 'choice-3']);
  assert.equal(key, "choice-1,choice-2,choice-3", "Wrong key");
});

test('Reorder - sameAnswer', function (assert) {
  let questionUtil = ReorderUtil.create({question: null});

  let answerA = ['choice-1', 'choice-2', 'choice-3'];
  let answerB = ['choice-1', 'choice-2', 'choice-3'];
  let answerC = ['choice-1', 'choice-3', 'choice-1']; //different order

  assert.ok(questionUtil.sameAnswer(answerA, answerB), "Answer should be the same");
  assert.ok(!questionUtil.sameAnswer(answerA, answerC), "Answer should not be the same, they have different order");

});


// --------------- Hot Spot Image tests
test('Hot Spot Image - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({answers: Ember.A([])});
  let questionUtil = HotSpotImageUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('Hot Spot Image - getCorrectAnswer', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = HotSpotImageUtil.create({question: question});

  let correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.get("length"), 2, "Missing items");
  assert.deepEqual(correctAnswer[0], 2, "Incorrect answer at 0");
  assert.deepEqual(correctAnswer[1], 3, "Incorrect answer at 1");
});

test('Hot Spot Image - isAnswerChoiceCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = HotSpotImageUtil.create({question: question});

  assert.ok(questionUtil.isAnswerChoiceCorrect(2), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect(1), "Answer should not be correct");
});

test('Hot Spot Image - isCorrect', function (assert) {
  let answers = Ember.A([
    Ember.Object.create({id: 1, isCorrect: false}),
    Ember.Object.create({id: 2, isCorrect: true}),
    Ember.Object.create({id: 3, isCorrect: true})
  ]);

  let question = Ember.Object.create({answers: answers});
  let questionUtil = HotSpotImageUtil.create({question: question});

  let correctAnswer = [2, 3];
  assert.ok(questionUtil.isCorrect(correctAnswer), "Answer should be correct");

  let correctDifferentOrder = [3, 2];
  assert.ok(questionUtil.isCorrect(correctDifferentOrder), "Answer should be correct, even it is not in the same order");

  let incorrectAnswer = [ 1, 3 ];
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct");

  let incorrectLessOptions = [ 1 ];
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

test('Hot Spot Image - distribution', function (assert) {
  let questionUtil = HotSpotImageUtil.create({question: null});

  let distribution = questionUtil.distribution([
    [1,2,3,5],
    [3,1,5,2], //same as 1, different order
    [1,4,3,6],
    [6,2,1,3],
    [4,1,6,3], //same as 3, different order
    [1,2,3,5] //same as 1, different order
  ]);

  let answerKeys = distribution.map(function(item) { return item.get("key"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  let expectedKeys = ['1,2,3,5', '1,3,4,6','1,2,3,6'];
  assert.deepEqual(answerKeys, expectedKeys, "Wrong answer keys");
  assert.deepEqual(counts, [3,2,1], "Wrong counts");
});

test('Hot Spot Image - answerKey', function (assert) {
  let questionUtil = HotSpotImageUtil.create({question: null});

  let key = questionUtil.answerKey([3,1,5,2]);
  assert.equal(key, '1,2,3,5', "Wrong key");
});

test('Hot Spot Image - sameAnswer', function (assert) {
  let questionUtil = HotSpotImageUtil.create({question: null});

  let answerA = [3,1,5,2];
  let answerB = [3,2,5,1]; //same as 1, different order
  let answerC = [3,1,5]; //less options
  let answerD = [3,1,5,4]; //different option, 4

  assert.ok(questionUtil.sameAnswer(answerA, answerB), "Answer should be the same even they have different order");
  assert.ok(!questionUtil.sameAnswer(answerA, answerC), "Answer should not be the same, it has less options");
  assert.ok(!questionUtil.sameAnswer(answerA, answerD), "Answer should not be the same, it has a different option");

});

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

  let incorrectAnswer = [ 1, 3 ];
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct");

  let incorrectLessOptions = [ 1 ];
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

test('Hot Spot Text - distribution', function (assert) {
  let questionUtil = HotSpotTextUtil.create({question: null});

  let distribution = questionUtil.distribution([
    [1,2,3,5],
    [3,1,5,2], //same as 1, different order
    [1,4,3,6],
    [6,2,1,3],
    [4,1,6,3], //same as 3, different order
    [1,2,3,5] //same as 1, different order
  ]);

  let answerKeys = distribution.map(function(item) { return item.get("key"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  let expectedKeys = ['1,2,3,5', '1,3,4,6','1,2,3,6'];
  assert.deepEqual(answerKeys, expectedKeys, "Wrong answer keys");
  assert.deepEqual(counts, [3,2,1], "Wrong counts");
});

test('Hot Spot Text - answerKey', function (assert) {
  let questionUtil = HotSpotTextUtil.create({question: null});

  let key = questionUtil.answerKey([3,1,5,2]);
  assert.equal(key, '1,2,3,5', "Wrong key");
});

test('Hot Spot Text - sameAnswer', function (assert) {
  let questionUtil = HotSpotImageUtil.create({question: null});

  let answerA = [3,1,5,2];
  let answerB = [3,2,5,1]; //same as 1, different order
  let answerC = [3,1,5]; //less options
  let answerD = [3,1,5,4]; //different option, 4

  assert.ok(questionUtil.sameAnswer(answerA, answerB), "Answer should be the same even they have different order");
  assert.ok(!questionUtil.sameAnswer(answerA, answerC), "Answer should not be the same, it has less options");
  assert.ok(!questionUtil.sameAnswer(answerA, answerD), "Answer should not be the same, it has a different option");

});


// --------------- Hot Text Highlight tests
test('Hot Text Highlight - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({
    answers: [],
    hasAnswers: false
  });
  let questionUtil = HotTextHighlightUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('Hot Text Highlight - getCorrectAnswer', function (assert) {

  //with no correct items
  let question = Ember.Object.create({
    answers: Ember.A([ { text: "<p>No correct answers in text</p>" }] ),
    hasAnswers: true
  });
  let questionUtil = HotTextHighlightUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "It shoould have not correct items");

  //with 1 correct item
  question = Ember.Object.create({ answers: Ember.A([ { text: "One correct answer in text [this]"} ]), hasAnswers:true });
  questionUtil = HotTextHighlightUtil.create({question: question});
  correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.length, 1, "Wrong number of items");
  assert.equal(correctAnswer[0], "this", "Wrong correct item");

  //with many correct items
  question = Ember.Object.create({ answers: Ember.A([ { text: "Many [correct] items in this sentence [another .]" } ]), hasAnswers:true });
  questionUtil = HotTextHighlightUtil.create({question: question});
  correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.length, 2, "Wrong number of items");
  assert.equal(correctAnswer[0], "correct", "Wrong correct item");
  assert.equal(correctAnswer[1], "another .", "Wrong correct item");
});

test('Hot Text Highlight - isAnswerChoiceCorrect', function (assert) {
  let question = Ember.Object.create({ answers: Ember.A([ { text: "Many [correct] items in this sentence [another .]"} ]), hasAnswers:true });
  let questionUtil = HotTextHighlightUtil.create({question: question});

  assert.ok(questionUtil.isAnswerChoiceCorrect("correct"), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect("invalid answer"), "Answer should not be correct");
});

test('Hot Text Highlight - isCorrect', function (assert) {
  let question = Ember.Object.create({ answers: Ember.A([ { text: "Many [correct] items in this sentence [another .]"} ]), hasAnswers:true });
  let questionUtil = HotTextHighlightUtil.create({question: question});

  let correctAnswer = ["correct", "another ."];
  assert.ok(questionUtil.isCorrect(correctAnswer), "Answer should be correct");

  let correctDifferentOrder = ["another .", "correct"];
  assert.ok(questionUtil.isCorrect(correctDifferentOrder), "Answer should be correct, even it is not in the same order");

  let incorrectAnswer = ["no", "correct"];
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct");

  let incorrectLessOptions = ["correct"];
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

test('Hot Text Highlight - distribution', function (assert) {
  let questionUtil = HotTextHighlightUtil.create({question: null});

  let distribution = questionUtil.distribution([
    ["hello", "good bye", "see you later"],
    ["hello", "good bye", "see you later"], //same as 1
    ["hello", "good bye", "good night"],
    ["hello", "morning", "good night"],
    ["hello", "good night", "good bye"], //same as 3, different order
    ["see you later", "hello", "good bye"] //same as 1, different order
  ]);

  let answerKeys = distribution.map(function(item) { return item.get("key"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  let expectedKeys = ['good bye,hello,see you later', 'good bye,good night,hello','good night,hello,morning'];
  assert.deepEqual(answerKeys, expectedKeys, "Wrong answer keys");
  assert.deepEqual(counts, [3,2,1], "Wrong counts");
});

test('Hot Text Highlight - answerKey', function (assert) {
  let questionUtil = HotTextHighlightUtil.create({question: null});

  let key = questionUtil.answerKey(["hello", "good bye", "see you later"]);
  assert.equal(key, 'good bye,hello,see you later', "Wrong key");
});

test('Hot Text Highlight - sameAnswer', function (assert) {
  let questionUtil = HotTextHighlightUtil.create({question: null});

  let answerA = ["hello", "good bye", "see you later"];
  let answerB = ["hello", "see you later", "good bye"]; //same as 1, different order
  let answerC = ["hello", "good bye"]; //less options
  let answerD = ["hello", "good bye", "see you"]; //different option, see you

  assert.ok(questionUtil.sameAnswer(answerA, answerB), "Answer should be the same even they have different order");
  assert.ok(!questionUtil.sameAnswer(answerA, answerC), "Answer should not be the same, it has less options");
  assert.ok(!questionUtil.sameAnswer(answerA, answerD), "Answer should not be the same, it has a different option");

});

test('Hot Text Highlight - getWordItems', function (assert) {
  assert.expect(5);

  var questionUtil = HotTextHighlightUtil.create({question: 'FakeQuestion'});

  //with no words
  var wordItems = questionUtil.getWordItems("").toArray();
  assert.equal(wordItems.length, 0, "Wrong number of items");

  //with one word
  wordItems = questionUtil.getWordItems("text").toArray();
  assert.equal(wordItems.length, 1, "Wrong number of items");
  assert.equal(wordItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(wordItems[0].get("text"), "text", "Wrong text for first object");

  //with many words
  wordItems = questionUtil.getWordItems("  A  phrase with  many words and extra spaces   ").toArray();
  assert.equal(wordItems.length, 8, "Wrong number of items");
});

test('Hot Text Highlight - getSentenceItems', function (assert) {
  assert.expect(16);

  var questionUtil = HotTextHighlightUtil.create({question: 'FakeQuestion'});

  //with no text
  var sentenceItems = questionUtil.getSentenceItems("").toArray();
  assert.equal(sentenceItems.length, 0, "Wrong number of items");

  //with no correct
  sentenceItems = questionUtil.getSentenceItems("Sentence 1").toArray();
  assert.equal(sentenceItems.length, 1, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");

  //with many sentences, 1 correct
  sentenceItems = questionUtil.getSentenceItems("Sentence 1 [Sentence 2.] Sentence 3").toArray();
  assert.equal(sentenceItems.length, 3, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");
  assert.equal(sentenceItems[1].get("text"), "Sentence 2.", "Wrong text for second object");
  assert.equal(sentenceItems[2].get("text"), "Sentence 3", "Wrong text for third object");

  //with many sentences, many correct
  sentenceItems = questionUtil.getSentenceItems("Sentence 1 [Sentence 2.] Sentence 3 [Sentence 4.] Sentence 5");
  assert.equal(sentenceItems.length, 5, "Wrong number of items");
  assert.equal(sentenceItems[0].get("id"), 0, "Wrong id for first object");
  assert.equal(sentenceItems[0].get("text"), "Sentence 1", "Wrong text for first object");
  assert.equal(sentenceItems[1].get("text"), "Sentence 2.", "Wrong text for second object");
  assert.equal(sentenceItems[2].get("text"), "Sentence 3", "Wrong text for third object");
  assert.equal(sentenceItems[3].get("text"), "Sentence 4.", "Wrong text for fourth object");
  assert.equal(sentenceItems[4].get("text"), "Sentence 5", "Wrong text for fifth object");

});

test('Hot Text Highlight - toItems', function (assert) {
  assert.expect(6);

  var questionUtil = HotTextHighlightUtil.create({question: 'FakeQuestion'});

  var items = Ember.A(["  ", "", "Item 1", " Item 2 ", "[Item 3]"]);

  var convertedItems = questionUtil.toItems(items).toArray();
  assert.equal(convertedItems.length, 3, "Should have 3 items, empty items are excluded");
  assert.equal(convertedItems[0].get("id"), 2, "Invalid id, it should have the original index id");
  assert.equal(convertedItems[0].get("text"), "Item 1", "Wrong item text");
  assert.equal(convertedItems[0].get("selected"), false, "Wrong item selected value");
  assert.equal(convertedItems[1].get("text"), "Item 2", "Wrong item text, text should be trimmed");
  assert.equal(convertedItems[2].get("text"), "Item 3", "Wrong item text, [] should be suppressed");
});

test('Hot Text Highlight - getItems isHotTextHighlightWord', function (assert) {
  assert.expect(5);
  var answers = Ember.A([ Ember.Object.create({ text: "Many [correct] items in this sentence [another]" }) ]),
    question = Ember.Object.create({
      answers: answers,
      hasAnswers: true,
      isHotTextHighlightWord: true
    });

  var questionUtil = HotTextHighlightUtil.create({question: question});
  var items = questionUtil.getItems().toArray();

  assert.equal(items.length, 7, "Missing items");
  assert.equal(items[0].get("id"), 0, "Invalid id");
  assert.equal(items[0].get("text"), "Many", "Wrong item text");
  assert.equal(items[0].get("selected"), false, "Wrong item selected value");
  assert.equal(items[1].get("text"), "correct", "Wrong item text");
});

test('Hot Text Highlight - getItems isHotTextHighlightSentence', function (assert) {
  assert.expect(5);
  var answers = Ember.A([ Ember.Object.create({ text: "Sentence 1 [Sentence 2.] Sentence 3 [Sentence 4.] Sentence 5" }) ]),
    question = Ember.Object.create({
      answers: answers,
      hasAnswers: true,
      isHotTextHighlightWord: false
    });

  var questionUtil = HotTextHighlightUtil.create({question: question});
  var items = questionUtil.getItems().toArray();

  assert.equal(items.length, 5, "Missing items");
  assert.equal(items[0].get("id"), 0, "Invalid id");
  assert.equal(items[0].get("text"), "Sentence 1", "Wrong item text");
  assert.equal(items[0].get("selected"), false, "Wrong item selected value");
  assert.equal(items[1].get("text"), "Sentence 2.", "Wrong item text");
});

test('Hot Text Highlight - transformText', function (assert) {
  assert.expect(4);
  var questionUtil = HotTextHighlightUtil.create({question: 'FakeQuestion'});

  //removing wrapping <p> tag for a normal text
  var text = questionUtil.transformText("<p> This is a test [for] the transform text </p>");
  assert.equal(text, "This is a test [for] the transform text", "Wrong text");

  //removing wrapping <p> tag for a text having more html tag inside
  text = questionUtil.transformText("<p> This is a test [<p>for</p>] <b>the</b> transform text </p>");
  assert.equal(text, "This is a test [<p>for</p>] <b>the</b> transform text");

  //ignoring a text not having a wrapping <p> tag, but <p> tags inside
  text = questionUtil.transformText("This is a test [<p>for</p>] <b>the</b> transform text");
  assert.equal(text, "This is a test [<p>for</p>] <b>the</b> transform text");

  //ignoring a text a starting <p> tag which, but not wrapping the whole text
  text = questionUtil.transformText("<p>This is a test</p> [<p>for</p>] <b>the</b> transform text");
  assert.equal(text, "<p>This is a test</p> [<p>for</p>] <b>the</b> transform text");
});

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

  let keys = distribution.map(function(item) { return item.get("key"); }).toArray();
  let counts = distribution.map(function(item) { return item.get("count"); }).toArray();

  assert.deepEqual(keys, ["text1","text2","text3"], "Wrong keys");
  assert.deepEqual(counts, [1,1,1], "Wrong counts");
});

test('Open Ended - answerKey', function (assert) {
  let questionUtil = OpenEndedUtil.create({question: null});

  let key = questionUtil.answerKey("any text");
  assert.equal(key, "any text", "Wrong key");
});

