import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('charts/gru-bubble-chart', 'Integration | Component | charts/gru bubble chart', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('Bubble Chart Layout', function(assert) {
  assert.expect(2);

  const scorePercentage = '80%';
  this.set('scorePercentage', scorePercentage);

  const backgroundColor = '#00e100';
  this.set('backgroundColor', backgroundColor);

  this.render(hbs`{{charts.gru-bubble-chart scorePercentage=scorePercentage backgroundColor=backgroundColor}}`);

  const $component = this.$(); //component dom element
  const $completionBubbleChart = $component.find(".gru-bubble-chart");
  T.exists(assert, $completionInformationChart, 'Missing bubble chart component');

  const $completionCircle = $component.find(".bubble-circle");
  T.exists(assert, $completionCircle, 'Missing circle');

});

