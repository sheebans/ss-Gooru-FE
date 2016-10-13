import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/assessment/gru-resources', 'Integration | Component | reports/assessment/gru resources', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{reports/assessment/gru-resources}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#reports/assessment/gru-resources}}
      template block text
    {{/reports/assessment/gru-resources}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
