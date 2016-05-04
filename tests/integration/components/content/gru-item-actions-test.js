import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

moduleForComponent('content/gru-item-actions', 'Integration | Component | content/gru item actions', {
  integration: true
});

test('Layout of item actions component', function (assert) {
  var model = Ember.Object.create({
    'id': "12345"
  });

  this.set('model',model);
  this.render(hbs`{{content/gru-item-actions transitionTo="settings" model=model}}`);

  var $component = this.$();
  assert.ok($component.find('.edit-item').length, "Edit button missing");
  assert.ok($component.find('.copy-item').length, "Copy button missing");
  assert.ok($component.find('.move-item').length, "Move button missing");
  assert.ok($component.find('.delete-item').length, "Delete button missing");
});
