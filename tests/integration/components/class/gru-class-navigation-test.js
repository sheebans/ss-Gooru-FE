import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('class/gru-class-navigation', 'Integration | Component | class/gru class navigation', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{class/gru-class-navigation}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#class/gru-class-navigation}}
      template block text
    {{/class/gru-class-navigation}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
