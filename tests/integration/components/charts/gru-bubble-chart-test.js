import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('charts/gru-bubble-chart', 'Integration | Component | charts/gru bubble chart', {
  integration: true
});

test('Bubble Chart Layout', function(assert) {

  const content = '80%';
  this.set('content', content);

  const color = '#00e100';
  this.set('color', color);

  this.render(hbs`{{charts.gru-bubble-chart content=content color=color}}`);

  const $component = this.$(); //component dom element
  const $completionBubbleChart = $component.find(".gru-bubble-chart");
  T.exists(assert, $completionBubbleChart, 'Bubble chart component exits');

  const $completionCircle = $component.find(".bubble-circle");
  T.exists(assert, $completionCircle, 'Circle exits');

  const $contentTest = $component.find(".bubble-circle span");
  assert.equal($contentTest.text().trim(), "80%", "Correct content");

});

