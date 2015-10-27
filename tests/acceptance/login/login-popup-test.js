import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';
import T from 'gooru-web/tests/helpers/assert';

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
    assert.expect(5);
    assert.equal(currentURL(), '/');

    //Login popup
    var $loginLink = find('.login-link');
    click($loginLink);

    var $signInForm = find('.sign-in-form');
    var $usernameInput = $signInForm.find('input.sign-in-username');
    var $passwordInput = $signInForm.find('input.sign-in-password');
    var $loginButton = $signInForm.find('button.submit-sign-in');

    fillIn($usernameInput, 'teacher');
    fillIn($passwordInput, '');
    click($loginButton);

    andThen(function() {
      assert.equal(currentURL(), '/');

      var $navBar = find('ul.menu-navbar');
      T.exists(assert, $navBar, "Missing Navigation Bar");
      var $profile = $navBar.find('li a.profile span.username');
      T.exists(assert, $profile, "Missing profile");
      assert.equal(T.text($profile), "teacher", "Wrong profile text");
    });
  });
});



