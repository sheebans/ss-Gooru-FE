import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import QuestionResult from 'gooru-web/models/result/question';
import AssessmentResult from 'gooru-web/models/result/assessment';

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

  const assessmentResult = AssessmentResult.create({
    id: 501,
    resourceResults: [
      QuestionResult.create({
        id: 601,
        resource: {
          order: 1
        },
        correct: false,
        timeSpent: 20000,
        reaction: 2,
      }),
      QuestionResult.create({
        id: 603,
        resource: {
          order: 3
        },
        correct: true,
        timeSpent: 20000,
        reaction: 2
      }),
      QuestionResult.create({
        id: 602,
        resource: {
          order: 2
        },
        correct: true,
        timeSpent: 20000,
        reaction: 2
      })
    ],
    submittedAt: date,
    title: 'Test Assessment Name',
    totalAttempts: 4
  });

  this.set('assessmentResult', assessmentResult);

  this.render(hbs`{{reports/assessment/gru-summary assessmentResult=assessmentResult}}`);

  var $component = this.$('.reports.assessment.gru-summary');  //component dom element
  assert.ok($component.length, "Component does not have the component classes");

  var $gradeContainer = $component.find('.summary-container .grade[style~="background-color:"]');
  assert.ok($gradeContainer.length, "Grade container is missing");

  var $percentage = $gradeContainer.find('.percentage');
  assert.ok($percentage.length, "Percentage container is missing");
  assert.equal($percentage.text().trim(), "67%", "Incorrect percentage text");

  var $attempts = $gradeContainer.find('.attempts');
  var $fractional = $attempts.find('.fractional');
  assert.ok($fractional, 'Fractional not found');
  assert.equal($fractional.find('.top').text().trim(), "2", "Incorrect fractional top text");
  assert.equal($fractional.find('.bottom').text().trim(), "3", "Incorrect fractional bottom text");
  assert.equal($attempts.find('.text').text().trim(), this.get('i18n').t('common.correct').string, "Incorrect attempts text");

  var $overviewContainer = $component.find('.summary-container .overview');
  assert.ok($overviewContainer.length, "Overview container is missing");
  assert.ok($overviewContainer.find('h5').length, "Header element is missing");
  assert.equal($overviewContainer.find('h5').text().trim(), 'Test Assessment Name', "Incorrect header text");

  // Attempt
  var $overviewSection = $overviewContainer.find('.information .attempt');
  assert.ok($overviewSection.find('title'), "Header element for 'attempt' section in overview is missing");
  assert.equal($overviewSection.find('.dropdown button').text().trim(), '4', 'Current attempt value is incorrect');
  assert.equal($overviewSection.find('.dropdown-menu li').length, 4, 'Incorrect number of attempts in dropdown menu');
  assert.equal($overviewSection.find('.total-attempts').text().trim(), '4', 'Incorrect number of total attempts');

  // Date
  $overviewSection = $overviewContainer.find('.information .date');
  assert.equal($overviewSection.find('span').text().trim(), '11:15 am Feb. 20th, 2010', 'Incorrect attempt date value');

  // Time
  $overviewSection = $overviewContainer.find('.information .time');
  assert.equal($overviewSection.find('span').text().trim(), '1m', 'Incorrect time value');

  // Reaction
  $overviewSection = $overviewContainer.find('.information .reaction');
  assert.ok($overviewSection.find('.emotion').hasClass('emotion-2'), "Emotion icon should have the class 'emotion-2'");

  // Reaction
  var $questionLinks = $overviewContainer.find('.gru-bubbles');
  assert.equal($questionLinks.find('li').length, 3, "Incorrect number of question links");
});

