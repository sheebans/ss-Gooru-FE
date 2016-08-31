import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/modals/gru-submit-confirmation', 'Integration | Component | content/modals/gru submit confirmation', {
  integration: true
});

test('Layout', function(assert) {
  this.set('model', {
    title: 'any-title',
    onConfirm: function() {
      assert.ok(true, 'onConfirm called.')
    }
  });
  this.render(hbs`{{content/modals/gru-submit-confirmation}}`);

  const $component = this.$('.content.modals.gru-submit-confirmation');
  assert.ok($component.length, 'Component classes');

  const $header = $component.find('.modal-header');
  assert.ok($header.length, 'Header');
  assert.ok($header.find('.modal-title').length, 'Header title');

  const $body = $component.find('.modal-body');
  assert.ok($body.length, 'Body');

  assert.equal($body.find('.actions button').length, 2, 'Number of action buttons');
  assert.ok($body.find('.actions .cancel').length, 'Cancel button');
  assert.ok($body.find('.actions .submit').length, 'Submit button');
});
