import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('player/gru-suggest-test', 'Integration | Component | player/gru suggest test', {
  integration: true
});

test('Layout', function(assert) {

  this.set('type', 'pre-test');
  this.render(hbs`{{player/gru-suggest-test type=type}}`);
  const $component = this.$();
  assert.ok($component.find('.player.gru-suggest-test').length, 'Missing suggest test panel');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .lead').length, 'Missing lead');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .description').length, 'Missing description');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .actions .btn-no').length, 'Missing no thanks button');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .actions .btn-suggestion').length, 'Missing suggestion button');
});
