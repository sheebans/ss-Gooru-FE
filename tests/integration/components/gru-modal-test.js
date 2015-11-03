import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('gru-modal', 'Integration | Component | gru modal', {
  integration: true
});

test('it renders', function(assert) {

  this.render(hbs`{{gru-modal}}`);

  assert.equal(this.$().text().trim(), '');

});
