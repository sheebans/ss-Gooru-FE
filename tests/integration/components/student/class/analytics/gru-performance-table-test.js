import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';
import wait from 'ember-test-helpers/wait';
import AssessmentModel from 'gooru-web/models/content/assessment';

moduleForComponent('student/class/analytics/gru-performance-table', 'Integration | Component | student/class/analytics/gru-performance-table', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set('locale','en');
  }
});

test('Performance Table Layout', function(assert) {

  const assessmentsMock = [
    AssessmentModel.create({id: '1', title: 'What is a Fish?'}),
    AssessmentModel.create({id: '2', title: 'Global Warming Quiz'}),
    AssessmentModel.create({id: '3', title: 'Pre Assessment Human Impact on Earth'})
  ];

  var assessmentsPerformanceMock = Ember.A([
    Ember.Object.create({
      user: '1',
      realId: '1',
      performanceData: Ember.Object.create({
        score : 1,
        completionDone: 1,
        completionTotal: 50,
        timeSpent: 5000000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '2',
      performanceData: Ember.Object.create({
        score : 2,
        completionDone: 14,
        completionTotal: 50,
        timeSpent: 5100000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '3',
      performanceData: Ember.Object.create({
        score : 3,
        completionDone: 23,
        completionTotal: 50,
        timeSpent: 5300000
      })
    })
  ]);

  this.set('assessmentsPerformanceMock', assessmentsPerformanceMock);
  this.set('assessmentsMock', assessmentsMock);

  this.render(hbs`{{student/class/analytics/gru-performance-table assessments=assessmentsMock studentPerformanceItems=assessmentsPerformanceMock}}`);

  const $component = this.$(); //component dom element
  const $performanceTable = $component.find('.gru-performance-table');

  T.exists(assert, $performanceTable, 'Missing student performance table');

  const $tableWrapper = $performanceTable.find('.performance-table-wrapper');
  T.exists(assert, $tableWrapper, 'Missing table wrapper');

  const $table = $performanceTable.find('.table');
  T.exists(assert, $table, 'Missing table');

  const $thead = $table.find('thead');
  T.exists(assert, $thead, 'Missing thead of the table');

  const $tbody = $table.find('tbody');
  T.exists(assert, $tbody, 'Missing tbody of the table');

  const $assessment = $thead.find('.assessment');
  T.exists(assert, $assessment, 'Missing assessment header');

  const $score = $thead.find('.score');
  T.exists(assert, $score, 'Missing score header');

  const $completion = $thead.find('.completion');
  T.exists(assert, $completion, 'Missing completion header');

  const $studyTime = $thead.find('.study-time');
  T.exists(assert, $studyTime, 'Missing completion header');

  assert.equal($tbody.find('th.assessment-title').length, 4, 'The tbody should have only 4 assessment headers');

  const $performanceScore = $tbody.find('.performance-score');
  assert.equal($performanceScore.length, 4, 'The tbody should have only 4 assessment performance scores');

  const $performanceCompletion = $tbody.find('.performance-completion');
  assert.equal($performanceCompletion.length, 4, 'The tbody should have only 4 assessment performance completions');

  const $performanceStudyTime = $tbody.find('.performance-time');
  assert.equal($performanceStudyTime.length, 4, 'The tbody should have only 4 assessment performance study times');

});

test('Sort by assessment title', function(assert) {

  const assessmentsMock = [
    AssessmentModel.create({id: '1', title: 'What is a Fish?'}),
    AssessmentModel.create({id: '2', title: 'Global Warming Quiz'}),
    AssessmentModel.create({id: '3', title: 'Assessment Human Impact on Earth'})
  ];

  var assessmentsPerformanceMock = Ember.A([
    Ember.Object.create({
      user: '1',
      realId: '1',
      performanceData: Ember.Object.create({
        score : 1,
        completionDone: 1,
        completionTotal: 50,
        timeSpent: 5000000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '2',
      performanceData: Ember.Object.create({
        score : 2,
        completionDone: 14,
        completionTotal: 50,
        timeSpent: 5100000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '3',
      performanceData: Ember.Object.create({
        score : 3,
        completionDone: 23,
        completionTotal: 50,
        timeSpent: 5300000
      })
    })
  ]);

  this.set('assessmentsPerformanceMock', assessmentsPerformanceMock);
  this.set('assessmentsMock', assessmentsMock);

  this.render(hbs`{{student/class/analytics/gru-performance-table assessments=assessmentsMock studentPerformanceItems=assessmentsPerformanceMock}}`);

  const $component = this.$(); //component dom element
  const $performanceTable = $component.find('.gru-performance-table .table');
  const $thead = $performanceTable.find('thead');
  const $assessmentHeader = $thead.find('th.assessment'); //assessments column
  const $tbody = $performanceTable.find('tbody');

  $assessmentHeader.find('a').click(); //descending assessment sort, because is sort ascending by default

  return wait().then(function () {
    assert.equal(T.text($tbody.find('tr:eq(1) th.header span')), 'What is a Fish?', 'First assessment should be What is a Fish?');
    $assessmentHeader.find('a').click(); //ascending assessment sort

    return wait().then(function () {
      assert.equal(T.text($tbody.find('tr:eq(1) th.header span')), 'Assessment Human Impact on Earth', 'First assessment should be Assessment Human Impact on Earth');
    });
  });
});

test('Sort by score Metric', function(assert) {
  const assessmentsMock = [
    AssessmentModel.create({id: '100', title: 'What is a Fish?'}),
    AssessmentModel.create({id: '22', title: 'Global Warming Quiz'}),
    AssessmentModel.create({id: '35', title: 'Assessment Human Impact on Earth'})
  ];

  var assessmentsPerformanceMock = Ember.A([
    Ember.Object.create({
      user: '1',
      realId: '1',
      performanceData: Ember.Object.create({
        score : 100,
        completionDone: 1,
        completionTotal: 50,
        timeSpent: 5000000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '2',
      performanceData: Ember.Object.create({
        score : 22,
        completionDone: 14,
        completionTotal: 50,
        timeSpent: 5100000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '3',
      performanceData: Ember.Object.create({
        score : 35,
        completionDone: 23,
        completionTotal: 50,
        timeSpent: 5300000
      })
    })
  ]);

  this.set('assessmentsPerformanceMock', assessmentsPerformanceMock);
  this.set('assessmentsMock', assessmentsMock);

  this.render(hbs`{{student/class/analytics/gru-performance-table assessments=assessmentsMock studentPerformanceItems=assessmentsPerformanceMock}}`);

  const $component = this.$(); //component dom element
  const $performanceTable = $component.find('.gru-performance-table .table');
  const $thead = $performanceTable.find('thead');
  const $scoreHeader = $thead.find('th.score'); //score column
  const $tbody = $performanceTable.find('tbody');

  $scoreHeader.find('a').click(); //descending score sort, because is sort ascending by default

  return wait().then(function () {
    assert.equal(T.text($tbody.find('tr:eq(1) th.header span')), 'Global Warming Quiz', 'First assessment should be Global Warming Quiz');
    $scoreHeader.find('a').click(); //ascending score sort

    return wait().then(function () {
      assert.equal(T.text($tbody.find('tr:eq(1) th.header span')), 'What is a Fish?', 'First assessment should be What is a Fish?');
   });
  });
});

test('Sort by Completion Metric', function(assert) {

  const assessmentsMock = [
    AssessmentModel.create({id: '100', title: 'What is a Fish?'}),
    AssessmentModel.create({id: '22', title: 'Global Warming Quiz'}),
    AssessmentModel.create({id: '35', title: 'Assessment Human Impact on Earth'})
  ];

  var assessmentsPerformanceMock = Ember.A([
    Ember.Object.create({
      user: '1',
      realId: '1',
      performanceData: Ember.Object.create({
        score : 1,
        completionDone: 1,
        completionTotal: 50,
        timeSpent: 5000000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '2',
      performanceData: Ember.Object.create({
        score : 2,
        completionDone: 14,
        completionTotal: 50,
        timeSpent: 5100000
      })
    }),
    Ember.Object.create({
      user: '1',
      realId: '3',
      performanceData: Ember.Object.create({
        score : 3,
        completionDone: 23,
        completionTotal: 50,
        timeSpent: 5300000
      })
    })
  ]);

  this.set('assessmentsPerformanceMock', assessmentsPerformanceMock);
  this.set('assessmentsMock', assessmentsMock);

  this.render(hbs`{{student/class/analytics/gru-performance-table assessments=assessmentsMock studentPerformanceItems=assessmentsPerformanceMock}}`);

  const $component = this.$(); //component dom element
  const $performanceTable = $component.find('.gru-performance-table .table');
  const $thead = $performanceTable.find('thead');
  const $completionHeader = $thead.find('th.completion'); //completion column
  const $tbody = $performanceTable.find('tbody');

  $completionHeader.find('a').click(); //descending completion sort, because is sort ascending by default

  return wait().then(function () {
    assert.equal(T.text($tbody.find('tr:eq(1) th.header span')), 'What is a Fish?', 'First assessment should be What is a Fish?');
    $completionHeader.find('a').click(); //ascending completion sort

    return wait().then(function () {
      assert.equal(T.text($tbody.find('tr:eq(1) th.header span')), 'Assessment Human Impact on Earth', 'First assessment should be Assessment Human Impact on Earth');
    });
  });
});
