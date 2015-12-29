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
    T.exists(assert, $profileContainer.find(".navigation"), "Missing profile navigation");
    T.exists(assert, $profileContainer.find(".content"), "Missing profile content");
  });
});
