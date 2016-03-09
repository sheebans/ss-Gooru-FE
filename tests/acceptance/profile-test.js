import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'profile-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/profile/pochita');

  andThen(function() {
    assert.equal(currentURL(), '/profile/pochita');

    const $profileContainer = find(".controller.profile");
    T.exists(assert, $profileContainer, "Missing profile container");
    T.exists(assert, $profileContainer.find("> .navigation"), "Missing profile navigation");
    T.exists(assert, $profileContainer.find("> .navigation .profile-info .actions .btn"), "Missing profile action button");
    T.exists(assert, $profileContainer.find("> .content"), "Missing profile content");
  });
});

test('menu option \'about\' is selected when navigating directly to profile.about', function (assert) {
  visit('/profile/pochita/about');

  andThen(function () {
    var $menu = find('.controller.profile > .navigation .profile-menu');

    assert.equal(currentURL(), '/profile/pochita/about');
    assert.ok($menu.find('.about').hasClass('selected'), 'Menu option \'about\' should be selected');
  });
});

test('menu option \'content\' is selected when navigating directly to profile.content', function (assert) {
  visit('/profile/pochita/content');

  andThen(function () {
    var $menu = find('.controller.profile > .navigation .profile-menu');

    assert.equal(currentURL(), '/profile/pochita/content');
    assert.ok($menu.find('.content').hasClass('selected'), 'Menu option \'content\' should be selected');
  });
});

test('menu option \'network\' is selected when navigating directly to profile.network', function (assert) {
  visit('/profile/pochita/network');

  andThen(function () {
    var $menu = find('.controller.profile > .navigation .profile-menu');

    assert.equal(currentURL(), '/profile/pochita/network');
    assert.ok($menu.find('.network').hasClass('selected'), 'Menu option \'network\' should be selected');
  });
});

test('menu option selection updates when navigating between sections', function (assert) {
  visit('/profile/pochita/about');

  andThen(function () {
    assert.equal(currentURL(), '/profile/pochita/about');

    andThen(function () {
      var $menu = find('.controller.profile > .navigation .profile-menu');

      assert.equal(currentURL(), '/profile/pochita/about');
      assert.ok($menu.find('.about').hasClass('selected'), 'Menu option \'about\' should be selected');

      click($menu.find('.network'));
      andThen(function () {
        assert.equal(currentURL(), '/profile/pochita/network');
        assert.ok(!$menu.find('.about').hasClass('selected'), 'Menu option \'about\' should no longer be selected');
        assert.ok($menu.find('.network').hasClass('selected'), 'Menu option \'network\' should now be selected');
      });
    });
  });
});
