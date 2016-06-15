import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-rich-text-editor', 'Integration | Component | gru rich text editor', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{gru-rich-text-editor}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#gru-rich-text-editor}}
      template block text
    {{/gru-rich-text-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
