import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/analytics/performance/student/gru-lesson-performance', 'Integration | Component | class/analytics/performance/student/gru lesson performance', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{class/analytics/performance/student/gru-lesson-performance}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#class/analytics/performance/student/gru-lesson-performance}}
      template block text
    {{/class/analytics/performance/student/gru-lesson-performance}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
