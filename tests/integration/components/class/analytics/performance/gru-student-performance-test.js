import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/analytics/performance/gru-performance', 'Integration | Component | class/analytics/performance/gru performance', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{class/analytics/performance/gru-performance}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#class/analytics/performance/gru-performance}}
      template block text
    {{/class/analytics/performance/gru-performance}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
