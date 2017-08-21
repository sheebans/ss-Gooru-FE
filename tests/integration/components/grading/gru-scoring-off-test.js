import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'grading/gru-scoring-off',
  'Integration | Component | grading/gru scoring off',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{grading/gru-scoring-off}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#grading/gru-scoring-off}}
      template block text
    {{/grading/gru-scoring-off}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
