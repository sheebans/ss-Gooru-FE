import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile content', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'content-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/profile/pochita/content/');

  andThen(function() {
    assert.equal(currentURL(), '/profile/pochita/content/');

    const $contentContainer = find(".controller.profile .content");
    T.exists(assert, $contentContainer, "Missing content container");

    const $contentNavContainer = find(".controller.profile .content .content-navigation");
    T.exists(assert, $contentNavContainer, "Missing content navigator container");

    const $categoryMenuActiveLink = find(".controller.profile .content .content-navigation .category-options .active");
    T.exists(assert, $categoryMenuActiveLink, "Missing content navigator active link");

    const $addToBtn = find(".controller.profile .content .content-navigation .btn-group");
    T.exists(assert, $addToBtn, "Missing add to button group");
  });
});

test('\'Add\' button not present in others profile', function(assert) {
  visit('/profile/param-123/content');
  andThen(function() {
    const $btnGroup = find(".controller.profile .content .content-navigation .btn-group");
    assert.notOk($btnGroup.length, '\'Add\' button present on other\'s profile');
  });
});

test('Modal for creating a course', function (assert) {
  visit('/profile/pochita/content/');
  andThen(function () {

    const $btnGroup = find(".controller.profile .content .content-navigation .btn-group");
    const $modal = find(".gru-modal");

    assert.ok(!$btnGroup.hasClass("open"), 'Button group not open');
    assert.ok(!$modal.hasClass("in"), 'Modal not visible');

    const $dropDown = $btnGroup.find("a.dropdown-toggle");
    $dropDown.click();
    assert.ok($btnGroup.hasClass("open"), 'Button group open');

    const $courseBtn = $btnGroup.find(".dropdown-menu li:first-child a");
    $courseBtn.click();
    assert.ok($modal.hasClass("in"), 'Modal visible');

    $modal.find(".actions button.cancel").click();
    assert.ok(!$modal.hasClass("in"), 'Modal was hidden');
  });
});
