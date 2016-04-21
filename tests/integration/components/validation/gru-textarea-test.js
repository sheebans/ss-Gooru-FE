import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('validation/gru-textarea', 'Integration | Component | validation/gru textarea', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{validation/gru-textarea}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#validation/gru-textarea}}
      template block text
    {{/validation/gru-textarea}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
