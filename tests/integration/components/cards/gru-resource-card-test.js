import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/gru-resource-card.js', 'Integration | Component | cards/gru resource card.js', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{cards/gru-resource-card.js}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#cards/gru-resource-card.js}}
      template block text
    {{/cards/gru-resource-card.js}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
