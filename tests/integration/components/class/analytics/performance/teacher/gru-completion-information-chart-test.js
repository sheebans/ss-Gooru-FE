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

  assert.expect(3);
  const identifier =2;
  this.set('identifier', identifier);

  this.render(hbs`{{class/analytics/performance/teacher/gru-completion-information-chart identifier=identifier}}`);

  const $component = this.$(); //component dom element
  const $completionInformationChart = $component.find(".gru-completion-information-chart");

  T.exists(assert, $completionInformationChart, 'Missing completion information chart component');

  const $idChart = $completionInformationChart.find("#information-chart-"+identifier);

  T.exists(assert, $idChart, 'Incorrect ID');

  const $graph = $idChart.find('svg');

  T.exists(assert, $graph, 'Missing Chart');



});
