import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | search', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'sign-in-token',
      user: {
        gooruUId: 'session-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/sign-in');

  andThen(function() {
    assert.equal(currentURL(), '/sign-in');

    const $signInContainer = find(".sign-in");
    T.exists(assert, $signInContainer, "Missing sign-in container");
    T.exists(assert, $signInContainer.find(".sign-in-wrapper"), "Missing sign-in-wrapper");
    const $signInHeader = $signInContainer.find(".sign-in-header");
    T.exists(assert, $signInHeader, "Missing sign-in-header");
    T.exists(assert, $signInHeader.find("h3"), "Missing sign-in title");
    assert.equal(T.text($signInHeader.find("h3")), "Welcome Back!", "Incorrect sign-in title text");
    T.exists(assert, $signInHeader.find(".description"), "Missing sign-in description");
    assert.equal(T.text($signInHeader.find(".description")), "Learning is just around the corner.", "Incorrect sign-in description text");
    T.exists(assert, $signInHeader.find(".googleButton"), "Missing sign-in google button");

    var $signInForm = $signInContainer.find(".sign-in-form form");
    T.exists(assert, $signInForm, "Missing sign in form");
    T.exists(assert, $signInForm.find("#signin_username"), "Missing username field");
    T.exists(assert, $signInForm.find("#signin_password"), "Missing password field");
    T.exists(assert, $signInForm.find("div.forgot-password a"), "Missing forgot password link");
    T.exists(assert, $signInForm.find("div.log-in-button button"), "Missing sign in button");

  });
});
