import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';

module('Acceptance | Login', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Login popup', function(assert) {

  visit('/');
  andThen(function() {

    assert.equal(currentURL(), '/');

    var $loginLink = find('.login-link');
    var $modal = find(".gru-modal");

    assert.ok(!$modal.hasClass('in'), "Modal should not be visible");

    click($loginLink);
    andThen(function() {

      $modal = find(".gru-modal");

      assert.ok($modal.hasClass('in'), "Modal should be visible");

      var $signInForm = $modal.find('.sign-in-form');
      var $usernameInput = $signInForm.find('.sign-in-username');
      var $passwordInput = $signInForm.find('.sign-in-password');
      var $loginButton = $signInForm.find('button.submit-sign-in');

      fillIn($usernameInput, 'teacher');
      fillIn($passwordInput, '');
      click($loginButton);

      andThen(function() {

        assert.equal(currentURL(), '/');
        assert.ok(!$modal.hasClass('in'), "Modal should have been hidden");

        var $navBar = find('ul.menu-navbar');
        assert.ok($navBar, "Missing Navigation Bar");

        var $profile = $navBar.find('li a.profile span.username');
        assert.ok($profile, "Missing profile");
        assert.equal($profile.text(), "teacher", "Wrong profile text");
      });
    });
  });
});
