import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('/class/analytics/performance/gru-scale-indicator', 'Integration | Component | /class/analytics/performance/gru scale indicator', {
  integration: true
});

test('Scale Indicator Layout', function(assert) {
  assert.expect(7);

  this.render(hbs`{{class/analytics/performance/gru-scale-indicator }}`);

  const $component = this.$(); //component dom element
  const $scaleIndicator = $component.find(".gru-scale-indicator");

  T.exists(assert, $scaleIndicator, 'Missing performance scale indicator');

  const $indicators = $scaleIndicator.find(".indicator-list li");
  assert.equal($indicators.length, 5, "Incorrect number of indicators displayed");

  const $badIndicator = $scaleIndicator.find(".indicator-list li .bad");
  T.exists(assert, $badIndicator, 'Missing bad indicator');

  const $regularIndicator = $scaleIndicator.find(".indicator-list li .regular");
  T.exists(assert, $regularIndicator, 'Missing regular indicator');

  const $goodIndicator = $scaleIndicator.find(".indicator-list li .good");
  T.exists(assert, $goodIndicator, 'Missing good indicator');

  const $veryGoodIndicator = $scaleIndicator.find(".indicator-list li .very-good");
  T.exists(assert, $veryGoodIndicator, 'Missing very good indicator');

  const $excellentIndicator = $scaleIndicator.find(".indicator-list li .excellent");
  T.exists(assert, $excellentIndicator, 'Missing excellent indicator');
});

