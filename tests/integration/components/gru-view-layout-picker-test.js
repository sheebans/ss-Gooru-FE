import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-view-layout-picker', 'Integration | Component | gru view layout picker', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{gru-view-layout-picker}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#gru-view-layout-picker}}
      template block text
    {{/gru-view-layout-picker}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
