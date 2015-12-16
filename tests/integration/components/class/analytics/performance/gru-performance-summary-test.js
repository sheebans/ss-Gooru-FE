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

test('Test for performance summary on unit', function(assert) {
  const unit = Ember.A(
     {
        title: "Quiz :: Indian History",
        type: "performance/student-performance",
        score:25,
        completionDone: 0,
        completionTotal: 1,
        timeSpent: 3,
        ratingScore: 0,
        attempts: 0
      }
  );
  console.log(JSON.parse(JSON.stringify(unit)));
  this.set('unit', unit);


  this.render(hbs`{{class.analytics.performance.gru-performance-summary model=unit}}`);

  const $component = this.$(); //component dom element

  const $performanceSummary = $component.find(".gru-performance-summary");

  T.exists(assert, $performanceSummary, 'Missing performance summary');

  const $scoreSummary = $component.find(".scoreSummary .description");
  T.exists(assert, $scoreSummary, 'Missing Score summary');

  console.log('Aqui->>>>',$scoreSummary);

  const $completionSummary = $component.find(".completionSummary .description");
  T.exists(assert, $completionSummary, 'Missing Completion summary');

  const $reactionSummary = $component.find(".reactionSummary p");
  T.exists(assert, $reactionSummary, 'Missing Reaction summary ');

  const $timeSpentSummary = $component.find(".timeSpentSummary p span");
  T.exists(assert, $timeSpentSummary, 'Missing Reaction summary ');


});

