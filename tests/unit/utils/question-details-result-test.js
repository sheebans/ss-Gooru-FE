import { averageReaction, correctAnswers, correctPercentage, totalTimeSpent } from '../../../utils/question-details-result';
import { module, test } from 'qunit';
import Ember from 'ember';
module('Unit | Utility | question-details-result');

test('Average Reaction', function (assert) {
  const questions = Ember.A([Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 1",
      questionType: 'OE',
      order: 1
    }),
    correct: true,
    timeSpent: 10, //seconds
    reaction: 5,
    answer: "answer"
  }), Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 2",
      questionType: 'OE',
      order: 2
    }),
    correct: false,
    timeSpent: 25, //seconds
    reaction: 2,
    answer: "answer"
  })]);
  assert.equal(averageReaction(questions), 4, 'Average reaction should be 4');
});

test('Correct Answers', function (assert) {
  const questions = Ember.A([Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 1",
      questionType: 'OE',
      order: 1
    }),
    correct: true,
    timeSpent: 10, //seconds
    reaction: 5,
    answer: "answer"
  }), Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 2",
      questionType: 'OE',
      order: 2
    }),
    correct: false,
    timeSpent: 25, //seconds
    reaction: 2,
    answer: "answer"
  })]);
  assert.equal(correctAnswers(questions), 1, 'Correct answer should be 1');
});

test('Correct Percentage', function (assert) {
  const questions = Ember.A([Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 1",
      questionType: 'OE',
      order: 1
    }),
    correct: true,
    timeSpent: 10, //seconds
    reaction: 5,
    answer: "answer"
  }), Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 2",
      questionType: 'OE',
      order: 2
    }),
    correct: false,
    timeSpent: 25, //seconds
    reaction: 2,
    answer: "answer"
  })]);
  const correctAnswer=correctAnswers(questions);
  assert.equal(correctPercentage(questions,correctAnswer), 50, 'Correct Percentage should be 50');
});

test('Total Time Spent', function (assert) {
  const questions = Ember.A([Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 1",
      questionType: 'OE',
      order: 1
    }),
    correct: true,
    timeSpent: 10, //seconds
    reaction: 5,
    answer: "answer"
  }), Ember.Object.create({
    question: Ember.Object.create({
      text:"This is a question 2",
      questionType: 'OE',
      order: 2
    }),
    correct: false,
    timeSpent: 25, //seconds
    reaction: 2,
    answer: "answer"
  })]);
  assert.equal(totalTimeSpent(questions), 35, 'Total time spent should be 35');
});
