import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/assessment/gru-resources-xs', 'Integration | Component | reports/assessment/gru resources xs', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reports/assessment/gru-resources-xs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#reports/assessment/gru-resources-xs}}
      template block text
    {{/reports/assessment/gru-resources-xs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
