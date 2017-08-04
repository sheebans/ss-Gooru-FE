import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'grading/gru-rubric-panel',
  'Integration | Component | grading/gru rubric panel',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{grading/gru-rubric-panel}}`);

  assert.equal(this.$().text().trim(), '');
});
