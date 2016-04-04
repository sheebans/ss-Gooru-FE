import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('gru-assessment-new', 'Integration | Component | gru assessment new', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('New Assessment Layout', function(assert) {

  this.render(hbs`{{content/modals/gru-assessment-new}}`);

  const $component = this.$(".gru-assessment-new");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-assessment').string, 'Incorrect Title');
  assert.ok($component.find('label span.required'), 'Missing Assessment Title label');
  assert.equal($component.find('label span.required').text(), this.get('i18n').t('common.assessment-title').string, 'Incorrect Assessment Title Label');
  assert.ok($component.find('label input'), 'Missing Assessment Title Input');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .add'), 'Missing Add Button');

});
test('Validate if the assessment title field is left blank', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-assessment-new}}`);

  const $component = this.$('.gru-assessment-new');
  const $titleField = $component.find(".gru-input.title");

  assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'Title error should be visible');
    // Fill in the input field
    $titleField.find("input").val('assessment Name');
    $titleField.find("input").blur();

    return wait().then(function () {
      assert.ok(!$titleField.find(".error-messages .error").length, 'Title error message was hidden');
    });
  });
});
test('Validate the character limit in the course title field', function (assert) {
  assert.expect(1);

  this.render(hbs`{{content/modals/gru-assessment-new}}`);

  const $component = this.$('.gru-assessment-new');
  const $titleField = $component.find(".gru-input.title");

  $titleField.find("input").val('123456790123456790123456790123456790123456790extra');
  $titleField.find("input").blur();

  assert.equal($titleField.find("input").val().length,50, "Incorrect number of incorrect characters");
});
