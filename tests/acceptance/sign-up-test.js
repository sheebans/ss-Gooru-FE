import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | sign-up', {
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
  visit('/sign-up');

  andThen(function() {
    assert.equal(currentURL(), '/sign-up');

    const $signUpContainer = find(".sign-up");
    var $modal = $signUpContainer.find(".modal");
    T.exists(assert, $modal, "Missing sign-up modal");
    var $firstStep = $modal.find(".first-step");
    T.exists(assert, $firstStep, "Missing first-step");
    T.exists(assert, $firstStep.find(".modal-content"), "Missing modal-content");
    const $signUpHeader = $firstStep.find(".modal-header");
    T.exists(assert, $signUpHeader, "Missing sign-up-header");
    T.exists(assert, $signUpHeader.find(".progress-dots"), "Missing progress-dots");
    T.exists(assert, $signUpHeader.find("h3"), "Missing sign-up title");
    assert.equal(T.text($signUpHeader.find("h3")), "Hello!", "Incorrect sign-up title text");
    T.exists(assert, $signUpHeader.find(".description"), "Missing sign-up description");
    assert.equal(T.text($signUpHeader.find(".description")), "We're glad you’ve decided to join us.", "Incorrect sign-up description text");
    T.exists(assert, $signUpHeader.find(".sign-in-description"), "Missing sign-in description");
    T.exists(assert, $signUpHeader.find(".google-button"), "Missing sign-up google button");

    var $signUpForm = $firstStep.find(".sign-up-form form");
    T.exists(assert, $signUpForm, "Missing sign up form");
    T.exists(assert, $signUpForm.find(".gru-input.username"), "Missing username field");
    T.exists(assert, $signUpForm.find(".gru-select-date-picker"), "Missing gru-select-date-picker component");
    T.exists(assert, $signUpForm.find(".gru-input.firstName"), "Missing firstName field");
    T.exists(assert, $signUpForm.find(".gru-input.lastName"), "Missing lastName field");
    T.exists(assert, $signUpForm.find(".gru-input.email"), "Missing email field");
    T.exists(assert, $signUpForm.find(".gru-input.password"), "Missing password field");
    T.exists(assert, $signUpForm.find(".gru-input.rePassword"), "Missing rePassword field");
    T.exists(assert, $signUpForm.find("div.sign-up-button button"), "Missing sign in button");

  });
});

test('it shows error messages if the all fields are left blank', function (assert) {
  visit('/sign-up');

  andThen(function() {
    assert.equal(currentURL(), '/sign-up');


    const $signUpContainer = find(".sign-up");
    const $usernameField = $signUpContainer.find(".gru-input.username");
    const $birthDayField = $signUpContainer.find(".gru-select-date-picker .birth-day-date");
    const $firstNameField = $signUpContainer.find(".gru-input.firstName");
    const $lastNameField = $signUpContainer.find(".gru-input.lastName");
    const $emailField = $signUpContainer.find(".gru-input.email");
    const $passwordField = $signUpContainer.find(".gru-input.password");
    const $rePasswordField = $signUpContainer.find(".gru-input.rePassword");

    assert.ok(!$usernameField.find(".error-messages .error").length, 'Username error message not visible');
    assert.ok(!$birthDayField.find(".error-messages .error").length, 'Birth day error message not visible');
    assert.ok(!$firstNameField.find(".error-messages .error").length, 'First name error message not visible');
    assert.ok(!$lastNameField.find(".error-messages .error").length, 'Last name error message not visible');
    assert.ok(!$emailField.find(".error-messages .error").length, 'Email error message not visible');
    assert.ok(!$passwordField.find(".error-messages .error").length, 'Password error message not visible');
    assert.ok(!$rePasswordField.find(".error-messages .error").length, 'Repassword error message not visible');

    // Try submitting without filling in data
    $signUpContainer.find("button.submit-sign-up").click();

    return wait().then(function () {

      assert.ok($usernameField.find(".error-messages .error").length, 'Username error message visible');
      assert.ok($birthDayField.find(".error-messages .error").length, 'Birth day error message visible');
      assert.ok($firstNameField.find(".error-messages .error").length, 'First name error message visible');
      assert.ok($lastNameField.find(".error-messages .error").length, 'Last name error message visible');
      assert.ok($emailField.find(".error-messages .error").length, 'Email error message visible');
      assert.ok($passwordField.find(".error-messages .error").length, 'Password error message visible');
      assert.ok($rePasswordField.find(".error-messages .error").length, 'Repassword error message visible');

    });
  });
});
