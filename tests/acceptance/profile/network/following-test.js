import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile network following', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'followers-network-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/pochita/network/following');

  andThen(function() {
    assert.equal(currentURL(), '/pochita/network/following');

    const $contentCourseContainer = find(".controller.network-followings");
    T.exists(assert, $contentCourseContainer, "Missing network followings container");

    const cards = $contentCourseContainer.find(".followings .card");
    assert.equal(cards.length, 6, "Missing cards");
  });
});
