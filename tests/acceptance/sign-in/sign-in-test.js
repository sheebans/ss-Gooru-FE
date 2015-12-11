import { test } from 'qunit';
import T from 'gooru-web/tests/helpers/assert';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | SignUp');

test('Sign in enter', function(assert) {
  visit('/');
  andThen(function() {
    assert.equal(currentURL(), '/');
    var $login = find('.login-link');
    click($login);
    andThen(function() {
      var $signInForm = find('.sign-in-form');
      var $usernameInput = $signInForm.find('#signin_username');
      var $usernamePassword = $signInForm.find('#signin_password');
      fillIn($usernameInput, 'pochita');
      fillIn($usernamePassword, '123');
      const $signInButton = $signInForm.find('.sign-in-button-section button');
      keyEvent($signInButton,'keypress', 13);
       andThen(function() {
         var $navbar = find('.navbar-collapse');
         var $userName = $navbar.find('ul.menu-navbar li a span.username');
         assert.equal(T.text($userName), "pochita", "Incorrect sign in");
        });
      });
    });
  });

