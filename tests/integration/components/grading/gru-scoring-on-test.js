import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'grading/gru-scoring-on',
  'Integration | Component | grading/gru scoring on',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{grading/gru-scoring-on}}`);

  assert.notEqual(this.$().text().trim(), '');
});
