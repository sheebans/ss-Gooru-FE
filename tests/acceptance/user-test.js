import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | user', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-token',
      user: {
        gooruUId: 'class-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/user');

  andThen(function() {
    assert.equal(currentURL(), '/user');

    const $userContainer = find(".controller.user");
    T.exists(assert, $userContainer, "Missing user container");


    T.exists(assert, $userContainer.find(".greetings"), "Missing user greetings");

    const $navigatorContainer = $userContainer.find(".navigator");
    T.exists(assert, $navigatorContainer, "Missing user navigator");

    T.exists(assert, $navigatorContainer.find(".actions .create-class"), "Missing create class button");

    T.exists(assert, $navigatorContainer.find(".actions .create-class"), "Missing join class button");

    T.exists(assert, $userContainer.find(".content"), "Missing user content");
  });
});
