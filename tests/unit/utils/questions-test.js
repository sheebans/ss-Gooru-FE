import Ember from 'ember';
import {
  MultipleChoiceUtil, MultipleAnswerUtil, TrueFalseUtil,
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

// --------------- Hot Text Highlight tests
test('Hot Text Highlight - getCorrectAnswer empty array', function (assert) {
  let question = Ember.Object.create({ text: "" });
  let questionUtil = HotTextHighlightUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('Hot Text Highlight - getCorrectAnswer', function (assert) {

  //with no correct items
  let question = Ember.Object.create({ text: "No correct answer in text" });
  let questionUtil = HotTextHighlightUtil.create({question: question});
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "It shoould have not correct items");

  //with 1 correct item
  question = Ember.Object.create({ text: "One correct answer in text [this]" });
  questionUtil = HotTextHighlightUtil.create({question: question});
  correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.length, 1, "Wrong number of items");
  assert.equal(correctAnswer[0], "this", "Wrong correct item");

  //with many correct items
  question = Ember.Object.create({ text: "Many [correct] items in this sentence [another .]" });
  questionUtil = HotTextHighlightUtil.create({question: question});
  correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.length, 2, "Wrong number of items");
  assert.equal(correctAnswer[0], "correct", "Wrong correct item");
  assert.equal(correctAnswer[1], "another .", "Wrong correct item");
});

test('Hot Text Highlight - isAnswerChoiceCorrect', function (assert) {
  let question = Ember.Object.create({ text: "Many [correct] items in this sentence [another .]" });
  let questionUtil = HotTextHighlightUtil.create({question: question});

  assert.ok(questionUtil.isAnswerChoiceCorrect("correct"), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect("invalid answer"), "Answer should not be correct");
});

test('Hot Text Highlight - isCorrect', function (assert) {
  let question = Ember.Object.create({ text: "Many [correct] items in this sentence [another .]" });
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

