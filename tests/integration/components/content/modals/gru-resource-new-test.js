import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';

moduleForComponent('content/modals/gru-resource-new', 'Integration | Component | content/modals/gru resource new', {
  integration: true,
  beforeEach: function () {
    this.inject.service('i18n');
  }
});

test('New Resource Layout', function(assert) {
  this.render(hbs`{{content/modals/gru-resource-new}}`);

  const $component = this.$(".gru-resource-new");
  assert.ok($component, 'Missing Component');
  assert.ok($component.find('h4.modal-title'), 'Missing Title');
  assert.ok($component.find('.icon .link'), 'Missing link icon');
  assert.equal($component.find('h4.modal-title').text(), this.get('i18n').t('common.add-new-resource').string, 'Incorrect Title');
  assert.ok($component.find('label span'), 'Missing URL label');
  assert.equal($component.find('span.title').text(), this.get('i18n').t('common.add-from-url').string, 'Incorrect Add URL Label');
  assert.equal($component.find('label span').text(), this.get('i18n').t('common.enter-url').string, 'Incorrect Enter URL Label');
  assert.ok($component.find('label input'), 'Missing URL Input');
  assert.ok($component.find('actions .cancel'), 'Missing Cancel Button');
  assert.ok($component.find('actions .add'), 'Missing Add Button');
});

test('Validate if the resource URL is left blank', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-resource-new}}`);

  const $component = this.$('.gru-resource-new');
  const $titleField = $component.find(".gru-input.url");

  assert.ok(!$titleField.find(".error-messages .error").length, 'URL error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'URL error should be visible');
    // Fill in the input field
    $titleField.find("input").val('http://goorutesting.com');
    $titleField.find("input").blur();

    return wait().then(function () {
      assert.ok(!$titleField.find(".error-messages .error").length, 'URL error message was hidden');
    });
  });
});

test('Validate if the resource URL field has only whitespaces', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-resource-new}}`);

  const $component = this.$('.gru-resource-new');
  const $titleField = $component.find(".gru-input.url");

  assert.ok(!$titleField.find(".error-messages .error").length, 'URL error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'URL error should be visible');
    // Fill in the input field
    $titleField.find("input").val(' ');
    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.ok($titleField.find(".error-messages .error").length, 'URL error message should be visible');
    });
  });
});
test('Validate invalid URL', function (assert) {
  assert.expect(3);

  this.render(hbs`{{content/modals/gru-resource-new}}`);

  const $component = this.$('.gru-resource-new');
  const $titleField = $component.find(".gru-input.url");

  assert.ok(!$titleField.find(".error-messages .error").length, 'URL error message not visible');

  // Try submitting without filling in data
  $component.find(".actions button[type='submit']").click();

  return wait().then(function () {

    assert.ok($titleField.find(".error-messages .error").length, 'URL error should be visible');
    // Fill in the input field
    $titleField.find("input").val('kkkk');
    $component.find(".actions button[type='submit']").click();

    return wait().then(function () {
      assert.ok($titleField.find(".error-messages .error").length, 'URL error message should be visible');
    });
  });
});
