import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile edit', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'edit-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/pochita/edit');

  andThen(function() {
    assert.equal(currentURL(), '/pochita/edit');

    const $editContainer = find(".controller.about.edit");
    T.exists(assert, $editContainer, "Missing edit container");
    T.exists(assert, $editContainer.find(".cancel"), "Missing cancel button");
    T.exists(assert, $editContainer.find(".save"), "Missing save button");
    T.exists(assert, $editContainer.find("#username"), "Missing username");

    const maxLenValue = this.$('#username input').prop('maxlength');
    assert.equal(maxLenValue, 25, "Incorrect input max length");

    T.exists(assert, $editContainer.find("#first-name"), "Missing user first name");
    T.exists(assert, $editContainer.find("#last-name"), "Missing user last name");
    T.exists(assert, $editContainer.find("#bio"), "Missing user biography");
    T.exists(assert, $editContainer.find(".roles"), "Missing roles radios");
    T.exists(assert, $editContainer.find("#studentId"), "Missing username");
    assert.equal(find(".roles .gru-radio").length, 3, "Missing roles gru-radio components");
    T.exists(assert, $editContainer.find(".gru-select"), "Missing gru-select component of countries");
  });
});

test('no menu option is selected when entering to edit mode', function (assert) {
  visit('/pochita/edit');

  andThen(function () {
      var $menu = find('.controller.profile > .navigation .profile-menu');
      assert.equal(currentURL(), '/pochita/edit');
      assert.notOk(!!$menu.find('.selected').length, 'A menu option is selected');
  });
});

test('Validate Student ID field', function (assert) {
  visit('/pochita/edit');

  andThen(function () {
    const $studentId = find("#studentId");
    $studentId.find("input").val('!Value');
    $studentId.find("input").blur();

    return wait().then(function () {
      assert.ok($studentId.find(".error-messages .error").length, 'Student ID error message should be appear');
    });
  });
});

//test('menu option \'about\' is selected when cancelling the edit', function (assert) {
//  visit('/pochita/edit');
//
//  andThen(function () {
//
//    const $editContainer = find(".controller.about.edit");
//    const $cancelButton = $editContainer.find('.btn-info.cancel');
//    assert.equal(currentURL(), '/pochita/edit');
//
//    click($cancelButton);
//    return wait().then(function () {
//      var $menu = find('.controller.profile .navigation .profile-menu');
//      assert.equal(currentURL(), '/pochita/about');
//      assert.ok($menu.find('.about').hasClass('selected'), 'Menu option \'about\' should be selected');
//    });
//  });
//});

