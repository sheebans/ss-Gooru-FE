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

  const assessmentResult = Ember.Object.create({
    id: 501,
    attempts: [
      1101,
      1102,
      1103,
      1104
    ],
    title: 'Test Assessment Name'
  });

  const attemptResult = Ember.Object.create({
    id: 1103,

    averageReaction: 2,
    totalTimeSpent: 1695,
    correctPercentage: 67,
    correctAnswers: 2,

    questionResults: [
      {
        id: 601,
        question: {
          order: 1
        },
        correct: false
      },
      {
        id: 603,
        question: {
          order: 3
        },
        correct: true
      },
      {
        id: 602,
        question: {
          order: 2
        },
        correct: true
      }
    ],

    submittedOn: 'Friday, January 15, 2016 6:02 AM'
  });

  this.set('assessment', assessmentResult);
  this.set('attempt', attemptResult);

  this.render(hbs`{{reports/assessment/gru-summary assessment=assessment attempt=attempt}}`);

  var $component = this.$('.reports.assessment.gru-summary');  //component dom element
  assert.ok($component.length, "Component does not have the component classes");

  var $gradeContainer = $component.find('> .grade[style~="background-color:"]');
  assert.ok($gradeContainer.length, "Grade container is missing");

  var $percentage = $gradeContainer.find('.percentage');
  assert.ok($percentage.length, "Percentage container is missing");
  assert.equal($percentage.text().trim(), "67%", "Incorrect percentage text");

  var $attempts = $gradeContainer.find('.attempts');
  assert.equal($attempts.text().trim(), "2 / 3 " + this.get('i18n').t('common.correct').string, "Incorrect attempts text");

  var $overviewContainer = $component.find('> .overview');
  assert.ok($overviewContainer.length, "Overview container is missing");
  assert.ok($overviewContainer.find('h1').length, "Header element is missing");
  assert.equal($overviewContainer.find('h1').text().trim(), 'Test Assessment Name', "Incorrect header text");

  // Attempt
  var $overviewSection = $overviewContainer.find('.information .attempt');
  assert.ok($overviewSection.find('strong').length, "Header element for 'attempt' section in overview is missing");
  assert.equal($overviewSection.find('.dropdown button').text().trim(), '3', 'Current attempt value is incorrect');
  assert.equal($overviewSection.find('.dropdown-menu li').length, 4, 'Incorrect number of attempts in dropdown menu');
  assert.equal($overviewSection.find('.total-attempts').text().trim(), '4', 'Incorrect number of total attempts');
  assert.equal($overviewSection.find('.date').text().trim(), 'Friday, January 15, 2016 6:02 AM', 'Incorrect attempt date value');

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
  assert.equal($questionLinks.find('li').length, 3, "Incorrect number of question links");
});

