import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/modals/gru-quick-course-search', 'Integration | Component | content/modals/gru quick course search', {
  integration: true
});

test('Layout', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{content/modals/gru-quick-course-search}}`);

  const $component = this.$('.content.modals.gru-quick-course-search');
  assert.ok($component.length, 'Component classes');

  const $header = $component.find('.modal-header');
  assert.ok($header.length, 'Header');
  assert.ok($header.find('.modal-title').length, 'Header title');


  const $body = $component.find('.modal-body');
  assert.ok($body.length, 'Body');

  const $footer = $component.find('.modal-footer');


  assert.equal($footer.find('.btn-group button').length, 2, 'Number of action buttons');
  assert.ok($footer.find('.btn-group .cancel').length, 'Cancel button');
  assert.ok($footer.find('.btn-group .assign').length, 'Join class button');


});
