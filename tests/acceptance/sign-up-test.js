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
    T.exists(assert, $signUpHeader.find(".googleButton"), "Missing sign-up google button");

    var $signUpForm = $firstStep.find(".sign-up-form form");
    T.exists(assert, $signUpForm, "Missing sign up form");
    T.exists(assert, $signUpForm.find(".gru-input.username"), "Missing username field");
    T.exists(assert, $signUpForm.find(".birth-day-date"), "Missing birth-day-date field");
    T.exists(assert, $signUpForm.find(".birth-months"), "Missing birth-months field");
    T.exists(assert, $signUpForm.find(".birth-days"), "Missing birth-days field");
    T.exists(assert, $signUpForm.find(".birth-years"), "Missing birth-years field");
    T.exists(assert, $signUpForm.find(".gru-input.firstName"), "Missing firstName field");
    T.exists(assert, $signUpForm.find(".gru-input.lastName"), "Missing lastName field");
    T.exists(assert, $signUpForm.find(".gru-input.email"), "Missing email field");
    T.exists(assert, $signUpForm.find(".gru-input.password"), "Missing password field");
    T.exists(assert, $signUpForm.find(".gru-input.rePassword"), "Missing rePassword field");
    T.exists(assert, $signUpForm.find("div.sign-up-button button"), "Missing sign in button");

  });
});
