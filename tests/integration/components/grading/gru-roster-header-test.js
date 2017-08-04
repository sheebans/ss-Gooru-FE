import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'grading/gru-roster-header',
  'Integration | Component | grading/gru roster header',
  {
    integration: true
  }
);

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{grading/gru-roster-header}}`);

  assert.equal(this.$().text().trim(), '');
});
