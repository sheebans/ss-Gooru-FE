import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';

moduleForComponent('class/analytics/performance/gru-performance-summary', 'Integration | Component | class/analytics/performance/gru performance summary', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Test for performance summary on valid unit values', function(assert) {
  const performance = Ember.Object.create(
     {
        title: "Quiz :: Indian History",
        type: "performance/student-performance",
        score:75,
        completionDone: 0,
        completionTotal: 1,
        timeSpent: 3,
        ratingScore: 0,
        attempts: 2,
       isNotCompleted: true
      });

  this.set('performance', performance);


  this.render(hbs`{{class.analytics.performance.gru-performance-summary performance=performance}}`);

  const $component = this.$(); //component dom element

  const $performanceSummary = $component.find(".gru-performance-summary");

  T.exists(assert, $performanceSummary, 'Missing performance summary');

  const $scoreSummary = $component.find(".scoreSummary .description");
  T.exists(assert, $scoreSummary, 'Missing Score summary');


  const $completionSummary = $component.find(".completionSummary .description");
  T.exists(assert, $completionSummary, 'Missing Completion summary');


  const $reactionSummary = $component.find(".reactionSummary p");
  T.exists(assert, $reactionSummary, 'Missing Reaction summary ');

  const $timeSpentSummary = $component.find(".timeSpentSummary p");
  assert.equal(T.text($timeSpentSummary), "3h", "Wrong time spent text");

  const $attemptSummary = $component.find(".attemptSummary p");
  assert.equal(T.text($attemptSummary), "2", "Wrong attempts text");
});

test('Test for performance summary on invalid unit values', function(assert) {
  const performance = Ember.Object.create(
    {
      title: "Quiz :: Indian History",
      type: "performance/student-performance",
      completionTotal: 1,
      ratingScore: 0,
      isNotCompleted: false
    });

  this.set('performance', performance);


  this.render(hbs`{{class.analytics.performance.gru-performance-summary performance=performance}}`);

  const $component = this.$(); //component dom element


  const $scoreSummary = $component.find(".scoreSummary p");
  assert.equal(T.text($scoreSummary), "N/A", "Wrong score text");

  const $completionSummary = $component.find(".completionSummary span");
  T.exists(assert, $completionSummary, 'Missing Completion summary checkmark');

  const $timeSpentSummary = $component.find(".timeSpentSummary p");
  assert.equal(T.text($timeSpentSummary), "h", "Wrong time spent text");

  const $attemptSummary = $component.find(".attemptSummary p");
  assert.equal(T.text($attemptSummary), "", "Wrong attempt summary text");
});

