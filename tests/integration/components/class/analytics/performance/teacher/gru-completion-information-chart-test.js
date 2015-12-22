import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/analytics/performance/teacher/gru-completion-information-chart', 'Integration | Component | class/analytics/performance/teacher/gru completion information chart', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{class/analytics/performance/teacher/gru-completion-information-chart}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#class/analytics/performance/teacher/gru-completion-information-chart}}
      template block text
    {{/class/analytics/performance/teacher/gru-completion-information-chart}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
