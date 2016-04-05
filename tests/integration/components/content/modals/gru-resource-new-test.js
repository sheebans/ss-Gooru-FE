import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/modals/gru-resource-new', 'Integration | Component | content/modals/gru resource new', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{content/modals/gru-resource-new}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#content/modals/gru-resource-new}}
      template block text
    {{/content/modals/gru-resource-new}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
