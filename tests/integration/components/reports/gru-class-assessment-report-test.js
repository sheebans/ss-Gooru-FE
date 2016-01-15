import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/gru-class-assessment-report', 'Integration | Component | reports/gru class assessment report', {
  integration: true
});

test('it renders', function (assert) {

  this.render(hbs`{{reports/gru-class-assessment-report}}`);

  var $component = this.$('.reports.gru-class-assessment-report');

  assert.ok($component.length, "Component does not have the component classes");

  assert.ok($component.find(".gru-summary"), "Summary component is missing");
  assert.ok($component.find(".gru-table-view"), "Table view component is missing");
  assert.ok($component.find(".gru-student-view"), "Student view component is missing");
});
