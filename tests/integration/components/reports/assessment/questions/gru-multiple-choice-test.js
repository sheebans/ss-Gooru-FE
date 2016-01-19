import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/assessment/questions/gru-multiple-choice', 'Integration | Component | reports/assessment/questions/gru multiple choice', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{reports/assessment/questions/gru-multiple-choice}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#reports/assessment/questions/gru-multiple-choice}}
      template block text
    {{/reports/assessment/questions/gru-multiple-choice}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
