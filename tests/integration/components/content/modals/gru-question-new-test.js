import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

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
  assert.equal($component.find('.question-types .panel').length, 9, 'Incorrect Number of Question Types');
  assert.ok($component.find('.question-type-MC'), 'Missing Multiple Choice Type');
  assert.ok($component.find('.question-type-MA'), 'Missing Multiple Answer Type');
  assert.ok($component.find('.question-type-OE'), 'Missing Open Ended Type');
  assert.ok($component.find('.question-type-HT_TO'), 'Missing Order List Type');
  assert.ok($component.find('.question-type-T_F'), 'Missing True/False Type');
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
test('Validate if the question title field is left blank', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-question-new}}`);

  const $component = this.$('.gru-question-new');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val('Question Name');
    $titleField.find("input").blur();

    return wait().then(function () {
      assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message was hidden');
    });
  });
});
test('Validate if the Question Title field has only whitespaces', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-question-new}}`);

  const $component = this.$('.gru-question-new');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Question Title error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Question Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val(' ');
    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.ok($titleField.find(".error-messages .error").length, 'Question Title error message should be visible');
    });
  });
});

test('Validate the character limit in the Question title field', function (assert) {
  this.render(hbs`{{content/modals/gru-question-new}}`);

  const maxLenValue = this.$('.gru-question-new .gru-input.title input').prop('maxlength');
  assert.equal(maxLenValue, 50, "Input max length");
});

