import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile content collections', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'collections-content-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/profile/pochita/content/collections');

  andThen(function() {
    assert.equal(currentURL(), '/profile/pochita/content/collections');

    const $contentCourseContainer = find(".controller.content-collections");
    T.exists(assert, $contentCourseContainer, "Missing content collections container");
  });
});
