import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile content', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'content-token',
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
