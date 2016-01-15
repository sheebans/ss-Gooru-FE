import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/class-assessment/gru-student-view', 'Integration | Component | reports/class assessment/gru student view', {
  integration: true
});

test('it renders', function (assert) {

  this.render(hbs`{{reports/class-assessment/gru-student-view}}`);

  assert.expect(0);
});
