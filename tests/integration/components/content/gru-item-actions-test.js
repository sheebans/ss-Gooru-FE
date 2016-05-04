import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/gru-item-actions', 'Integration | Component | content/gru item actions', {
  integration: true
});

test('Layout of item actions component', function (assert) {
  this.render(hbs`{{content/gru-item-actions transitionTo="settings" modelId="12345"}}`);

  var $component = this.$();
  assert.ok($component.find('.edit-item').length, "Edit button missing");
  assert.ok($component.find('.copy-item').length, "Copy button missing");
  assert.ok($component.find('.move-item').length, "Move button missing");
  assert.ok($component.find('.delete-item').length, "Delete button missing");
});
