import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('cards/gru-resource-card', 'Integration | Component | cards/gru resource card', {
  integration: true
});

test('it renders', function (assert) {

  this.render(hbs`{{cards/gru-resource-card}}`);

  assert.expect(0);
});
