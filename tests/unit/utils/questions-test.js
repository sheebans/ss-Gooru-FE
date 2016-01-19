import Ember from 'ember';
import {MultipleChoiceUtil, MultipleAnswerUtil, TrueFalseUtil} from '../../../utils/questions';
import { module, test } from 'qunit';

module('Unit | Utility | questions');

// --------------- Multiple Choice tests
test('Multiple Choice - getCorrectAnswer empty array', function(assert) {
  let question = Ember.Object.create({ answers: Ember.A([]) });
  let questionUtil = MultipleChoiceUtil.create({ question: question });
  assert.ok(!questionUtil.getCorrectAnswer(), "Correct answer should not be found");
});

test('Multiple Choice - getCorrectAnswer no correct answer provided', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = MultipleChoiceUtil.create({ question: question });
  assert.ok(!questionUtil.getCorrectAnswer(), "Correct answer should not be found");
});

test('Multiple Choice - getCorrectAnswer when correct answer is provided', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false }),
    Ember.Object.create({ id: 2, isCorrect: true })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = MultipleChoiceUtil.create({ question: question });
  assert.equal(questionUtil.getCorrectAnswer(), 2, "Incorrect answer id");
});

test('Multiple Choice - isCorrect', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false }),
    Ember.Object.create({ id: 2, isCorrect: true })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = MultipleChoiceUtil.create({ question: question });

  assert.ok(!questionUtil.isCorrect(1), "Option one is not correct");
  assert.ok(questionUtil.isCorrect(2), "Option two should be correct");
});

// --------------- Multiple Answer tests
test('Multiple Answer - getCorrectAnswer empty array', function(assert) {
  let question = Ember.Object.create({ answers: Ember.A([]) });
  let questionUtil = MultipleAnswerUtil.create({ question: question });
  let correctAnswer = questionUtil.getCorrectAnswer();
  assert.ok(!correctAnswer.get("length"), "Correct answer should be an empty array");
});

test('Multiple Answer - getCorrectAnswer', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false }),
    Ember.Object.create({ id: 2, isCorrect: true }),
    Ember.Object.create({ id: 3, isCorrect: true })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = MultipleAnswerUtil.create({ question: question });

  let correctAnswer = questionUtil.getCorrectAnswer().toArray();
  assert.equal(correctAnswer.get("length"), 3, "Missing items");
  assert.deepEqual(correctAnswer[0], {id: 1, selection: false}, "Incorrect answer at 0");
  assert.deepEqual(correctAnswer[1], {id: 2, selection: true}, "Incorrect answer at 1");
  assert.deepEqual(correctAnswer[2], {id: 3, selection: true}, "Incorrect answer at 2");
});

test('Multiple Answer - isAnswerChoiceCorrect', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false }),
    Ember.Object.create({ id: 2, isCorrect: true }),
    Ember.Object.create({ id: 3, isCorrect: true })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = MultipleAnswerUtil.create({ question: question });

  assert.ok(questionUtil.isAnswerChoiceCorrect({ id: 1, selection: false }), "Answer should be correct");
  assert.ok(!questionUtil.isAnswerChoiceCorrect({ id: 3, selection: false }), "Answer should not be correct");
});

test('Multiple Answer - isCorrect', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false }),
    Ember.Object.create({ id: 2, isCorrect: true }),
    Ember.Object.create({ id: 3, isCorrect: true })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = MultipleAnswerUtil.create({ question: question });

  let correctAnswer = Ember.A([ {id: 1, selection: false}, {id: 2, selection: true}, {id: 3, selection: true} ]);
  assert.ok(questionUtil.isCorrect(correctAnswer), "Answer should be correct");

  let correctDifferentOrder = Ember.A([ {id: 3, selection: true}, {id: 1, selection: false}, {id: 2, selection: true} ]);
  assert.ok(questionUtil.isCorrect(correctDifferentOrder), "Answer should be correct, even it is not in the same order");

  let incorrectAnswer = Ember.A([ {id: 3, selection: false}, {id: 1, selection: false}, {id: 2, selection: true} ]);
  assert.ok(!questionUtil.isCorrect(incorrectAnswer), "Answer should not be correct");

  let incorrectLessOptions = Ember.A([ {id: 1, selection: false}, {id: 2, selection: true} ]);
  assert.ok(!questionUtil.isCorrect(incorrectLessOptions), "Answer should not be correct, it has less options");
});

// --------------- True False tests
test('True/False - getCorrectAnswer when correct answer is provided', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false }),
    Ember.Object.create({ id: 2, isCorrect: true })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = TrueFalseUtil.create({ question: question });
  assert.equal(questionUtil.getCorrectAnswer(), 2, "Incorrect answer id");
});

test('True/False - isCorrect', function(assert) {
  let answers = Ember.A([
    Ember.Object.create({ id: 1, isCorrect: false }),
    Ember.Object.create({ id: 2, isCorrect: true })
  ]);

  let question = Ember.Object.create({ answers: answers });
  let questionUtil = TrueFalseUtil.create({ question: question });

  assert.ok(!questionUtil.isCorrect(1), "Option one is not correct");
  assert.ok(questionUtil.isCorrect(2), "Option two should be correct");
});


