import Ember from 'ember';
import QuestionResult from 'gooru-web/models/result/question';
import UserQuestionsResult from 'gooru-web/models/result/user-questions';
import ReportData from 'gooru-web/models/result/report-data';
import { module, test } from 'qunit';

module('Unit | Model | result/report data');


test('getAllResults', function(assert) {

  var resources = Ember.A([
    Ember.Object.create({"id": "56a120483b6e7b090501d3e7"}),
    Ember.Object.create({"id": "56a120483b6e7b090501d3e8"}),
    Ember.Object.create({"id": "56a120483b6e7b090501d3e9"})
  ]);

  var students = Ember.A([
    Ember.Object.create({"id": "56983a9060a68052c1ed934c"}),
    Ember.Object.create({"id": "56983a90fb01fecc328e2388"}),
    Ember.Object.create({"id": "56983a906596902edadedc7c"})
  ]);

  var reportData = ReportData.create().initReportData(students, resources);
  reportData.merge([
    UserQuestionsResult.create({
      user: "56983a9060a68052c1ed934c",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1})
      ])
    }),
    UserQuestionsResult.create({
      user: "56983a90fb01fecc328e2388",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 5, "timeSpent": 1216, "userAnswer": 2})
      ])
    }),
    UserQuestionsResult.create({
      user: "56983a906596902edadedc7c",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e9", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3})
      ])
    })
  ]);

  let results = reportData.getAllResults();
  assert.equal(results.get("length"), 9, "Should be 9, 3 resources x 3 students");
});


test('getResultsByStudent', function(assert) {
  var resources = Ember.A([
    Ember.Object.create({"id": "56a120483b6e7b090501d3e7"}),
    Ember.Object.create({"id": "56a120483b6e7b090501d3e8"}),
    Ember.Object.create({"id": "56a120483b6e7b090501d3e9"})
  ]);

  var students = Ember.A([
    Ember.Object.create({"id": "56983a9060a68052c1ed934c"}),
    Ember.Object.create({"id": "56983a90fb01fecc328e2388"}),
    Ember.Object.create({"id": "56983a906596902edadedc7c"})
  ]);

  var reportData = ReportData.create().initReportData(students, resources);
  reportData.merge([
    UserQuestionsResult.create({
      user: "56983a9060a68052c1ed934c",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1})
      ])
    }),
    UserQuestionsResult.create({
      user: "56983a90fb01fecc328e2388",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 5, "timeSpent": 1216, "userAnswer": 2})
      ])
    }),
    UserQuestionsResult.create({
      user: "56983a906596902edadedc7c",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e9", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3})
      ])
    })
  ]);

  let results = reportData.getResultsByStudent("56983a906596902edadedc7c");
  assert.equal(results.get("length"), 3, "Should be 3, 3 were resources provided");
});

test('getResultsByQuestion', function(assert) {
  var resources = Ember.A([
    Ember.Object.create({"id": "56a120483b6e7b090501d3e7"}),
    Ember.Object.create({"id": "56a120483b6e7b090501d3e8"}),
    Ember.Object.create({"id": "56a120483b6e7b090501d3e9"})
  ]);

  var students = Ember.A([
    Ember.Object.create({"id": "56983a9060a68052c1ed934c"}),
    Ember.Object.create({"id": "56983a90fb01fecc328e2388"})
  ]);

  var reportData = ReportData.create().initReportData(students, resources);
  reportData.merge([
    UserQuestionsResult.create({
      user: "56983a9060a68052c1ed934c",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1})
      ])
    }),
    UserQuestionsResult.create({
      user: "56983a90fb01fecc328e2388",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 5, "timeSpent": 1216, "userAnswer": 2})
      ])
    })
  ]);

  let results = reportData.getResultsByQuestion("56a120483b6e7b090501d3e7");
  assert.equal(results.get("length"), 2, "Should be 2, 2 were students provided");
});

test('getStudentsByQuestionAndUserAnswer', function(assert) {
  const questionA = Ember.Object.create({"id": "56a120483b6e7b090501d3e7", "questionType": "MC"});
  const questionB = Ember.Object.create({"id": "56a120483b6e7b090501d3e8", "questionType": "MC"});
  const questionC = Ember.Object.create({"id": "56a120483b6e7b090501d3e9", "questionType": "MC"});

  var resources = Ember.A([questionA, questionB, questionC]);

  var students = Ember.A([
    Ember.Object.create({"id": "56983a9060a68052c1ed934c"}),
    Ember.Object.create({"id": "56983a90fb01fecc328e2388"}),
    Ember.Object.create({"id": "56983a906596902edadedc7c"})
  ]);

  var reportData = ReportData.create().initReportData(students, resources);
  reportData.merge([
    UserQuestionsResult.create({
      user: "56983a9060a68052c1ed934c",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e9", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 3})
      ])
    }),
    UserQuestionsResult.create({
      user: "56983a90fb01fecc328e2388",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 1}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 2}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e9", "correct": false, "reaction": 1, "timeSpent": 1216, "userAnswer": 3})
      ])
    }),
    UserQuestionsResult.create({
      user: "56983a906596902edadedc7c",
      questionResults: Ember.A([
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e7", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 2}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e8", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3}),
        QuestionResult.create({questionId: "56a120483b6e7b090501d3e9", "correct": true, "reaction": 1, "timeSpent": 1216, "userAnswer": 3})
      ])
    })
  ]);

  var results = reportData.getStudentsByQuestionAndUserAnswer(questionA, 1);
  var ids = results.map(function(student){ return student.get("id"); }).toArray();
  assert.equal(results.get("length"), 2, "2 students answered questionA as 1");
  assert.deepEqual(ids, ['56983a9060a68052c1ed934c', '56983a90fb01fecc328e2388'], "Wrong students for questionA answer 1");

  results = reportData.getStudentsByQuestionAndUserAnswer(questionB, 2);
  ids = results.map(function(student){ return student.get("id"); }).toArray();
  assert.equal(results.get("length"), 1, "1 student answered questionB as 2");
  assert.deepEqual(ids, ['56983a90fb01fecc328e2388'], "Wrong students for questionA answer 1");

  results = reportData.getStudentsByQuestionAndUserAnswer(questionC, 3);
  ids = results.map(function(student){ return student.get("id"); }).toArray();
  assert.equal(results.get("length"), 3, "3 students answered questionC as 3");
  assert.deepEqual(ids, ['56983a9060a68052c1ed934c', '56983a90fb01fecc328e2388', '56983a906596902edadedc7c'], "Wrong students for questionC answer 3");

});
