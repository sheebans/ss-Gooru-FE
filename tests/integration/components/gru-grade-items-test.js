import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent(
  'gru-grade-items',
  'Integration | Component | gru grade items',
  {
    integration: true
  }
);

test('Layout', function(assert) {
  this.render(hbs`{{gru-grade-items}}`);

  const $component = this.$();

  assert.ok($component.find('.item').length, 6, 'Missing grade items');
  assert.ok(
    $component.find('.item:first-child .context').length,
    'Missing context'
  );
  assert.ok(
    $component.find('.item:first-child .question').length,
    'Missing question'
  );
  assert.ok(
    $component.find('.item:first-child .greater-than .chevron_right').length,
    'Incorrect icon'
  );
});
