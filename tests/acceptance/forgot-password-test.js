import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | forgot-password', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'forgot-password-token',
      user: {
        gooruUId: 'session-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/forgot-password');

  andThen(function() {
    assert.equal(currentURL(), '/forgot-password');

    const $forgotPasswordContainer = find(".forgot-password");
    var $modal = $forgotPasswordContainer.find(".modal");
    T.exists(assert, $modal, "Missing forgot-password modal");
    T.exists(assert, $modal.find(".modal-content"), "Missing modal-content");
    const $forgotPasswordHeader = $modal.find(".modal-header");
    T.exists(assert, $forgotPasswordHeader, "Missing forgot-password-header");
    T.exists(assert, $forgotPasswordHeader.find("h3"), "Missing forgot-password title");
    assert.equal(T.text($forgotPasswordHeader.find("h3")), "Forgot your password?", "Incorrect forgot-password title text");
    T.exists(assert, $forgotPasswordHeader.find(".description"), "Missing forgot-password description");
    assert.equal(T.text($forgotPasswordHeader.find(".description")), "It happens to all of us.", "Incorrect forgot-password description text");

    const $forgotPasswordBody = $modal.find(".modal-body");
    var $forgotPasswordForm = $forgotPasswordBody.find(".forgot-password-form form");
    T.exists(assert, $forgotPasswordForm, "Missing sign up form");
    T.exists(assert, $forgotPasswordForm.find(".gru-input.username"), "Missing username field");
    T.exists(assert, $forgotPasswordForm.find(".footer-description"), "Missing footer-description div");
    T.exists(assert, $forgotPasswordForm.find("div.submit-button button"), "Missing submit button");
  });
});
