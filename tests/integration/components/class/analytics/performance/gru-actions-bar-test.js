import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/analytics/performance/gru-actions-bar', 'Integration | Component | class/analytics/performance/gru actions bar', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{class/analytics/performance/gru-actions-bar}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#class/analytics/performance/gru-actions-bar}}
      template block text
    {{/class/analytics/performance/gru-actions-bar}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
