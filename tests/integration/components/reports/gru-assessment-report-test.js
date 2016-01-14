import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/gru-assessment-report', 'Integration | Component | reports/gru assessment report', {
  integration: true
});

test('it renders', function (assert) {

  this.render(hbs`{{reports/gru-assessment-report}}`);

  var $component = this.$('.reports.gru-assessment-report');  //component dom element

  assert.ok($component.length, "Component does not have the component classes");

  assert.ok($component.find(".gru-summary"), "Summary component is missing");
  assert.ok($component.find(".gru-mastery"), "Mastery component is missing");
  assert.ok($component.find(".gru-questions"), "Questions component is missing");

});
