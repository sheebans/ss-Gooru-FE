import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/assessment/gru-summary', 'Integration | Component | reports/assessment/gru summary', {
  integration: true,

  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('it renders', function (assert) {
  const date = new Date(2010, 1, 20);
  date.setSeconds(10);
  date.setMinutes(15);
  date.setHours(11);

  const model = Ember.Object.create({

    attemptsList: [
      100,
      101,
      102,
      103
    ],

    assessmentName: 'Sample Assessment Name',
    reaction: 2,
    timeSpent: 1695,
    correctPercentage: 50,
    correctAnswers: 1,
    currentAttempt: 3,

    resourceLinks: [
      Ember.Object.create({
        'label': "1",
        'status': 'correct',
        'value': 10
      }),
      Ember.Object.create({
        'label': "2",
        'status': 'incorrect',
        'value': 11
      })],

    submittedOn: date,
    totalAttempts: 4,
    totalQuestions: 2
  });

  this.set('model', model);

  this.render(hbs`{{reports/assessment/gru-summary model=model}}`);

  var $component = this.$('.reports.assessment.gru-summary');  //component dom element
  assert.ok($component.length, "Component does not have the component classes");

  var $gradeContainer = $component.find('> .grade[style~="background-color:"]');
  assert.ok($gradeContainer.length, "Grade container is missing");

  var $percentage = $gradeContainer.find('.percentage');
  assert.ok($percentage.length, "Percentage container is missing");
  assert.equal($percentage.text().trim(), "50%", "Incorrect percentage text");

  var $attempts = $gradeContainer.find('.attempts');
  assert.equal($attempts.text().trim(), "1 / 2 " + this.get('i18n').t('common.correct').string, "Incorrect attempts text");

  var $overviewContainer = $component.find('> .overview');
  assert.ok($overviewContainer.length, "Overview container is missing");
  assert.ok($overviewContainer.find('h1').length, "Header element is missing");
  assert.equal($overviewContainer.find('h1').text().trim(), 'Sample Assessment Name', "Incorrect header text");

  // Attempt
  var $overviewSection = $overviewContainer.find('.information .attempt');
  assert.ok($overviewSection.find('strong').length, "Header element for 'attempt' section in overview is missing");
  assert.equal($overviewSection.find('.dropdown button').text().trim(), '3', 'Current attempt value is incorrect');
  assert.equal($overviewSection.find('.dropdown-menu li').length, 4, 'Incorrect number of attempts in dropdown menu');
  assert.equal($overviewSection.find('.total-attempts').text().trim(), '4', 'Incorrect number of total attempts');
  assert.equal($overviewSection.find('.date').text().trim(), 'February, 20th 2010, 11:15:10 AM', 'Incorrect attempt date value');

  // Time
  $overviewSection = $overviewContainer.find('.information .time');
  assert.ok($overviewSection.find('strong').length, "Header element for 'time' section in overview is missing");
  assert.equal($overviewSection.find('span').text().trim(), '28m 15s', 'Incorrect time value');

  // Reaction
  $overviewSection = $overviewContainer.find('.information .reaction');
  assert.ok($overviewSection.find('strong').length, "Header element for 'reaction' section in overview is missing");
  assert.ok($overviewSection.find('.emotion').hasClass('emotion-2'), "Emotion icon should have the class 'emotion-2'");

  // Reaction
  var $questionLinks = $overviewContainer.find('.gru-bubbles');
  assert.equal($questionLinks.find('li').length, 2, "Incorrect number of question links");
});

