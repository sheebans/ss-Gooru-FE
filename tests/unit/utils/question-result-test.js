import Ember from 'ember';
import { averageReaction, correctAnswers, correctPercentage, totalTimeSpent, stats , completedResults, sortResults}
  from 'gooru-web/utils/question-result';
import QuestionResult from 'gooru-web/models/result/question';
import { module, test } from 'qunit';


module('Unit | Utility | question-result');

test('Average Reaction', function (assert) {
  const questions = Ember.A([
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 1",
        questionType: 'OE',
        order: 1
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 2",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 2
    })
  ]);
  assert.equal(averageReaction(questions), 4, 'Average reaction should be 4');
});

test('Correct Answers', function (assert) {
  const questions = Ember.A([
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 1",
        questionType: 'OE',
        order: 1
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 2",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 2
    })
  ]);
  assert.equal(correctAnswers(questions), 1, 'Correct answer should be 1');
});

test('Correct Percentage', function (assert) {
  const questions = Ember.A([
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 1",
        questionType: 'OE',
        order: 1
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 2",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 2
    })
  ]);
  assert.equal(correctPercentage(questions), 50, 'Correct Percentage should be 50');
});

test('Total Time Spent', function (assert) {
  const questions = Ember.A([
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 1",
        questionType: 'OE',
        order: 1
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 2",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 2
    })
  ]);
  assert.equal(totalTimeSpent(questions), 35, 'Total time spent should be 35');
});

test('Stats', function (assert) {
  const questions = Ember.A([
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 1",
        questionType: 'OE',
        order: 1
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 2",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 4
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 3",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 4
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 4",
        questionType: 'OE',
        order: 2
      }),
      correct: null, //skipped
      timeSpent: 25, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      notStarted: true
    }),
    QuestionResult.create({
      notStarted: true
    })
  ]);
  let totals = stats(questions);

  assert.equal(totals.get("total"), 6, 'Wrong total');
  assert.equal(totals.get("totalCorrect"), 1, 'Wrong correct');
  assert.equal(totals.get("correctPercentage"), 17, 'Wrong correct percentage');
  assert.equal(totals.get("totalIncorrect"), 2, 'Wrong incorrect');
  assert.equal(totals.get("incorrectPercentage"), 33, 'Wrong incorrect percentage');
  assert.equal(totals.get("totalSkipped"), 1, 'Wrong skipped');
  assert.equal(totals.get("skippedPercentage"), 17, 'Wrong skipped percentage');
  assert.equal(totals.get("totalNotStarted"), 2, 'Wrong not started');
  assert.equal(totals.get("notStartedPercentage"), 33, 'Wrong not started percentage');
  assert.equal(totals.get("totalCompleted"), 3, 'Wrong not started');
  assert.equal(totals.get("completedPercentage"), 50, 'Wrong not completed percentage');
  assert.equal(totals.get("totalTimeSpent"), 85, 'Wrong total time spent');
  assert.equal(totals.get("averageReaction"), 3, 'Wrong average reaction');
});

test('completedResults', function (assert) {
  const questions = Ember.A([
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 1",
        questionType: 'OE',
        order: 1
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 2",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 4
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 3",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 4
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 4",
        questionType: 'OE',
        order: 2
      }),
      correct: null, //skipped
      timeSpent: 25, //seconds
      reaction: 5
    }),
    QuestionResult.create({
      notStarted: true
    }),
    QuestionResult.create({
      notStarted: true
    })
  ]);
  let completed = completedResults(questions);

  assert.equal(completed.get("length"), 3, 'Wrong total');
});



test('sortResults', function (assert) {
  const questions = Ember.A([
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 1",
        questionType: 'OE',
        order: 1
      }),
      correct: true,
      timeSpent: 10, //seconds
      reaction: 5,
      submittedAt: new Date("October 13, 2014 11:40:00")
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 2",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 4,
      submittedAt: new Date("October 13, 2014 11:20:00")
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 3",
        questionType: 'OE',
        order: 2
      }),
      correct: false,
      timeSpent: 25, //seconds
      reaction: 4,
      submittedAt: new Date("October 13, 2014 11:10:00")
    }),
    QuestionResult.create({
      question: QuestionResult.create({
        text: "This is a question 4",
        questionType: 'OE',
        order: 2
      }),
      correct: null, //skipped
      timeSpent: 25, //seconds
      reaction: 5,
      submittedAt: new Date("October 13, 2014 11:50:00")
    }),
    QuestionResult.create({
      notStarted: true
    }),
    QuestionResult.create({
      notStarted: true
    })
  ]);
  let sorted = sortResults(questions);
  let dates = sorted.map(function(questionResult){
    return questionResult.get("submittedAt");
  });

  assert.deepEqual(dates, [
    null,
    null,
    new Date("October 13, 2014 11:10:00"),
    new Date("October 13, 2014 11:20:00"),
    new Date("October 13, 2014 11:40:00"),
    new Date("October 13, 2014 11:50:00")
  ], 'Wrong dates');
});
