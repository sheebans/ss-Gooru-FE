import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-user-sign-up-cancel', 'Integration | Component | gru user sign up cancel', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gru-user-sign-up-cancel}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gru-user-sign-up-cancel}}
      template block text
    {{/gru-user-sign-up-cancel}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
