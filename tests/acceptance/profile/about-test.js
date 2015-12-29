import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | profile about', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'course-content-token',
      user: {
        gooruUId: 'pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/profile/pochita/about');

  andThen(function() {
    assert.equal(currentURL(), '/profile/pochita/about');

    const $aboutContainer = find(".controller.about");
    T.exists(assert, $aboutContainer, "Missing about container");
  });
});
