import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('/class/analytics/performance/teacher/gru-metrics-sub-header', 'Integration | Component | /class/analytics/performance/teacher/gru-metrics-sub-header', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});
test('Metrics Sub Header Layout', function(assert) {
  assert.expect(4);

  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-sub-header }}`);

  const $component = this.$(); //component dom element
  const $subHeader = $component.find(".metrics-sub-header");

  T.exists(assert, $subHeader, 'Missing sub header section');

  const $score = $subHeader.find(".score");
  T.exists(assert, $score, 'Missing score sub header');

  const $completion = $subHeader.find(".completion");
  T.exists(assert, $completion, 'Missing completion sub header');

  const $time = $subHeader.find(".study-time");
  T.exists(assert, $time, 'Missing study time sub header');

});
test('Verify that there is sub header selected', function(assert) {
  assert.expect(1);

  this.on('parentAction', function(option){
    assert.ok(option.get("value") === 'score', "Selected options should be score");
  });


  this.render(hbs`{{class/analytics/performance/teacher/gru-metrics-sub-header onSortChange='parentAction'}}`);
  var $component = this.$(); //component dom element
  var $subHeader = $component.find("th.metrics-sub-header");
  $subHeader.find(".score").click(); //select score


});
