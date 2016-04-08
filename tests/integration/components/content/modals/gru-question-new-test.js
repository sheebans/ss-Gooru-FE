import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('content/modals/gru-question-new', 'Integration | Component | content/modals/gru question new', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('Question New Layout', function(assert) {

  this.render(hbs`{{content/modals/gru-question-new}}`);

  const $component = this.$(".gru-question-new");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-new-question').string, 'Incorrect Title');
  assert.ok($component.find('label.title span.required'), 'Missing Collection Title label');
  assert.equal($component.find('label.title span.required').text(), this.get('i18n').t('common.question-title').string, 'Incorrect Question Title Label');
  assert.ok($component.find('label.title input'), 'Missing Collection Title Input');
  assert.equal($component.find('label.type span.required').text(), this.get('i18n').t('common.add-type-question').string, 'Incorrect Question Type Label');
  assert.equal($component.find('.question-types .panel').length,8, 'Incorrect Number of Question Types');
  assert.ok($component.find('.question-type-MC'), 'Missing Multiple Choice Type');
  assert.ok($component.find('.question-type-MA'), 'Missing Multiple Answer Type');
  assert.ok($component.find('.question-type-HT_TO'), 'Missing Order List Type');
  assert.ok($component.find('.T_F'), 'Missing True/False Type');
  assert.ok($component.find('.question-type-HT_HL'), 'Missing Hot Text Highlight Type');
  assert.ok($component.find('.question-type-FIB'), 'Missing Fill in the blanks Type');
  assert.ok($component.find('.question-type-HS_IMG'), 'Missing Hot Spot Image Type');
  assert.ok($component.find('.question-type-HS_TXT'), 'Missing Hot Spot Text Type');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .add'), 'Missing Add Button');
});

test('Select question type', function(assert) {

  this.render(hbs`{{content/modals/gru-question-new}}`);

  const $component = this.$(".gru-question-new");
  assert.ok($component, 'Missing Component');
  assert.equal($component.find('.panel.question-type-MC.active').length,1, 'Multiple choice should be active');
  const $multipleAnswer =$component.find('.panel.question-type-MA');
  $multipleAnswer.click();
  assert.equal($component.find('.panel.question-type-MA.active').length,1, 'Multiple answer should be active');
  assert.equal($component.find('.panel.active').length,1, 'Only one type should be active');
});

