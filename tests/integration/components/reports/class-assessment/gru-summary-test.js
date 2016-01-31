import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/class-assessment/gru-summary', 'Integration | Component | reports/class assessment/gru summary', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('it renders', function (assert) {

  var assessment = Ember.Object.create({
    resources: [
      {"id": "56a120483b6e7b090501d3e7"},
      {"id": "56a1204886b2e565e1b2c230"},
      {"id": "56a12048ddee2022a741356a"}
    ]
  });

  var students = Ember.A([
    {"id": "56983a9060a68052c1ed934c"},
    {"id": "56983a90fb01fecc328e2388"},
    {"id": "56983a906596902edadedc7c"},
    {"id": "56983a9082f705e65f2fe607"}
  ]);

  var reportData = {
    "56983a9060a68052c1ed934c": {
      "56a120483b6e7b090501d3e7": {"correct": false, "reaction": 1, "timeSpent": 1216},
      "56a1204886b2e565e1b2c230": {"correct": true, "reaction": 2, "timeSpent": 2458},
      "56a12048ddee2022a741356a": {"correct": true, "reaction": 3, "timeSpent": 1433}
    },
    "56983a90fb01fecc328e2388": {
      "56a120483b6e7b090501d3e7": {"correct": false, "reaction": 5, "timeSpent": 1216},
      "56a1204886b2e565e1b2c230": {},
      "56a12048ddee2022a741356a": {"correct": true, "reaction": 3, "timeSpent": 1433}
    },
    "56983a906596902edadedc7c": {
      "56a120483b6e7b090501d3e7": {"correct": false, "reaction": 1, "timeSpent": 1216},
      "56a1204886b2e565e1b2c230": {"correct": true, "reaction": 5, "timeSpent": 2458},
      "56a12048ddee2022a741356a": {"correct": true, "reaction": 5, "timeSpent": 1433}
    },
    "56983a9082f705e65f2fe607": {
      "56a120483b6e7b090501d3e7": {"correct": true, "reaction": 4, "timeSpent": 1216},
      "56a1204886b2e565e1b2c230": {"correct": true, "reaction": 4, "timeSpent": 2458},
      "56a12048ddee2022a741356a": {"correct": true, "reaction": 3, "timeSpent": 1433}
    }
  };

  this.setProperties({
    assessment: assessment,
    students: students,
    reportData: reportData
  });

  this.render(hbs`{{ reports/class-assessment/gru-summary
    assessment=assessment
    students=students
    rawData=reportData }}`);

  const $component = this.$('.reports.class-assessment.gru-summary');
  assert.ok($component.length, 'Component has component classes');

  const $overview = $component.find('.overview');
  assert.ok($overview.find('.scores .gru-pie-chart').length, 'Overview section has a pie chart with the class scores');
  assert.equal($overview.find('.scores > span').text(), this.get('i18n').t('common.classScores').string,
    'The class scores pie chart has the correct caption');

  assert.ok($overview.find('.average-score .gru-bubble-chart').length, 'Overview section has a colored circle with the average class score');
  assert.equal($overview.find('.average-score .gru-bubble-chart').text().trim(), '71%', 'Average class score is computed correctly');
  assert.equal($overview.find('.average-score > span').text(), this.get('i18n').t('common.averageScore').string,
    'The circle with the average class score has the correct caption');

  assert.ok($overview.find('.completion .gru-radial-chart').length, 'Overview section has a radial chart with the proportion of students that have completed the assessment');
  assert.ok($overview.find('.completion .gru-radial-chart').text().trim(), '3/4', 'Radial chart label shows the correct proportion of students that have completed the assessment');
  assert.equal($overview.find('.completion > span').text(), this.get('i18n').t('common.completed').string,
    'The radial chart has the correct caption');

  // TODO: tests for questions section
  //const $questions = $component.find('.questions');

  assert.ok($component.find('.grading-scale-legend').length, 'Component has a grading scale legend');
});
