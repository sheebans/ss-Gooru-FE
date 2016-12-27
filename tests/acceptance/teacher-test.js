import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | Teacher Landing page', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/teacher');

  andThen(function() {
    assert.equal(currentURL(), '/teacher');

    T.exists(assert, find("header.gru-header"), "Header component not found");

    const $userContainer = find(".controller.teacher-landing");
    T.exists(assert, $userContainer, "Missing student container");
    T.exists(assert, $userContainer.find(".greetings"), "Missing teacher greetings");
  });
});