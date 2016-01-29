import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/assessment/gru-questions-xs', 'Integration | Component | reports/assessment/gru questions xs', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{reports/assessment/gru-questions-xs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#reports/assessment/gru-questions-xs}}
      template block text
    {{/reports/assessment/gru-questions-xs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
