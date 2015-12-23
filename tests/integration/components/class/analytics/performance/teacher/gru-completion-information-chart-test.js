import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('class/analytics/performance/teacher/gru-completion-information-chart', 'Integration | Component | class/analytics/performance/teacher/gru completion information chart', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Information Chart Layout', function(assert) {

  assert.expect(2);
  const minValue =0;
  this.set('minValue', minValue);

  const maxValue =50;
  this.set('maxValue', maxValue);

  const completePercent =13;
  this.set('completePercent', completePercent);

  this.render(hbs`{{class/analytics/performance/teacher/gru-completion-information-chart minValue=minValue maxValue=maxValue completePercent=completePercent}}`);

  const $component = this.$(); //component dom element
  const $completionInformationChart = $component.find(".gru-completion-information-chart");

  T.exists(assert, $completionInformationChart, 'Missing completion information chart component');

  const $graph = $completionInformationChart.find('svg');

  T.exists(assert, $graph, 'Missing Chart');



});
