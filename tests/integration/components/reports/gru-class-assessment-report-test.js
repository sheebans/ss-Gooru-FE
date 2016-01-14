import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('reports/gru-class-assessment-report', 'Integration | Component | reports/gru class assessment report', {
  integration: true
});

test('it renders', function (assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{reports/gru-class-assessment-report}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#reports/gru-class-assessment-report}}
      template block text
    {{/reports/gru-class-assessment-report}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
