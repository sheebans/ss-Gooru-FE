import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/class-assessment/gru-question-performance', 'Integration | Component | reports/class assessment/gru question performance', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{reports/class-assessment/gru-question-performance}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#reports/class-assessment/gru-question-performance}}
      template block text
    {{/reports/class-assessment/gru-question-performance}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
