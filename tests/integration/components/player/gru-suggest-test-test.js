import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';
import { ASSESSMENT_SUB_TYPES } from 'gooru-web/config/config';

moduleForComponent('player/gru-suggest-test', 'Integration | Component | player/gru suggest test', {
  integration: true
});

test('Layout', function(assert) {

  this.set('type', ASSESSMENT_SUB_TYPES.PRE_TEST);
  this.render(hbs`{{player/gru-suggest-test type=type}}`);
  const $component = this.$();
  assert.ok($component.find('.player.gru-suggest-test').length, 'Missing suggest test panel');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .lead').length, 'Missing lead');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .description').length, 'Missing description');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .actions .btn-no').length, 'Missing no thanks button');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .actions .btn-suggestion').length, 'Missing suggestion button');
});

test('Layout BackFill Pre test', function(assert) {

  this.set('type', ASSESSMENT_SUB_TYPES.BACKFILL);
  this.set('assessment', {
    isCollection: true,
    resources: Ember.A([])
  });
  this.render(hbs`{{player/gru-suggest-test type=type assessment=assessment}}`);
  const $component = this.$();
  assert.ok($component.find('.player.gru-suggest-test').length, 'Missing suggest test panel');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .lead').length, 'Missing lead');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .description').length, 'Missing description');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .assessment-info .collection-icon.collection').length, 'Missing collection icon');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .assessment-info .title').length, 'Missing collection title');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .assessment-info .resource.border-gray').length, 'Missing collection resources');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .assessment-info .resource.question').length, 'Missing collection questions');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .actions .btn-no').length, 'Missing no thanks button');
  assert.ok($component.find('.player.gru-suggest-test .panel-body .actions .btn-backfill').length, 'Missing suggestion backfill button');
});
