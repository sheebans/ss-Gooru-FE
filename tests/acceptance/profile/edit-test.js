import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile edit', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'about-token',
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
    T.exists(assert, $editContainer.find("#first-name"), "Missing user first name");
    T.exists(assert, $editContainer.find("#last-name"), "Missing user last name");
    T.exists(assert, $editContainer.find("#bio"), "Missing user biography");
    T.exists(assert, $editContainer.find("#teacher-role"), "Missing user teacher role checkbox");
    T.exists(assert, $editContainer.find("#student-role"), "Missing user student role checkbox");
    T.exists(assert, $editContainer.find("#other-role"), "Missing user other role checkbox");
    T.exists(assert, $editContainer.find("#school"), "Missing user school");
    T.exists(assert, $editContainer.find("#district"), "Missing user district");
    T.exists(assert, $editContainer.find("#country"), "Missing user country");
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

test('menu option \'about\' is selected when cancelling the edit', function (assert) {
  visit('/pochita/edit');

  andThen(function () {
    var $cancelButton = find('.controller.about.edit  .cancel');
    assert.equal(currentURL(), '/pochita/edit');

    click($cancelButton);
    andThen(function () {
      var $menu = find('.controller.profile > .navigation .profile-menu');
      assert.equal(currentURL(), '/pochita/about');
      assert.ok($menu.find('.about').hasClass('selected'), 'Menu option \'about\' should be selected');
    });
  });
});

