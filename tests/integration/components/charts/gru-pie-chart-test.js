import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('charts/gru-pie-chart', 'Integration | Component | charts/gru pie chart', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{charts/gru-pie-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#charts/gru-pie-chart}}
      template block text
    {{/charts/gru-pie-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
