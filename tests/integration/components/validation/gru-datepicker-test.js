import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('validation/gru-datepicker', 'Integration | Component | validation/gru datepicker', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{validation/gru-datepicker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#validation/gru-datepicker}}
      template block text
    {{/validation/gru-datepicker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
