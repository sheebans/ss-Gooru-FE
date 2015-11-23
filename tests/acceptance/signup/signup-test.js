import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';

module('Acceptance | SignUp', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Sign up test', function(assert) {

  visit('/');
  andThen(function() {

    assert.equal(currentURL(), '/');

    var $signUpLink = find('.sign-up-button');
    var $modal = find(".gru-modal");

    assert.ok(!$modal.hasClass('in'), "Modal should not be visible");

    click($signUpLink);

    andThen(function() {
      var $errorSpan;
      $modal = find(".gru-modal");

      assert.ok($modal.hasClass('in'), "Modal should be visible");

      var $signUpForm = $modal.find('.gru-user-sign-up');
      var $usernameInput = $signUpForm.find('.gru-input.username input');
      var $firstNameInput = $signUpForm.find('.gru-input.firstName input');
      var $lastNameInput = $signUpForm.find('.gru-input.lastName input');
      var $emailInput = $signUpForm.find('.gru-input.email input');
      var $passwordInput = $signUpForm.find('.gru-input.password input');
      var $rePasswordInput = $signUpForm.find('.gru-input.rePassword input');
      var $roleInput = $signUpForm.find('.gru-radio #studentRadioButton');

      var $datepickerInput = $signUpForm.find('.gru-datepicker input');

      var $signUpButton = $signUpForm.find('button.btn-sign-up');

      click($signUpButton);

      $errorSpan = $signUpForm.find('.firstName span.error');
      assert.ok($errorSpan, "First Name error message is not showing");

      $errorSpan = $signUpForm.find('.lastName span.error');
      assert.ok($errorSpan, "Last name error message is not showing");

      $errorSpan = $signUpForm.find('.gru-radio span.error');
      assert.ok($errorSpan, "Role error message is not showing");

      //Username field
      $errorSpan = $signUpForm.find('.username span.error');

      assert.ok($errorSpan, "Username error message is not showing when empty");

      fillIn($usernameInput, 'gooruTest$');
      $usernameInput.trigger('blur');
      assert.ok($errorSpan, "Username accepted a symbol");

      fillIn($usernameInput, 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet consectetur adipisci velit');
      $usernameInput.trigger('blur');
      assert.ok($errorSpan, "Username accepted too many characters");

      fillIn($usernameInput, 'go');
      $usernameInput.trigger('blur');
      assert.ok($errorSpan, "Username accepted less than 4 characters");

      // Datepicker date of birth field
      $errorSpan = $signUpForm.find('.gru-datepicker span.error');

      assert.ok($errorSpan, "Datepicker error message is not showing");

      // Email field
      $errorSpan = $signUpForm.find('.email span.error');

      assert.ok($errorSpan, "Email error message is not showing");

      fillIn($emailInput, 'notAnEmail.com'); // invalid format
      $emailInput.trigger('blur');
      assert.ok($errorSpan, "Email accepted an invalid format");

      // Password field
      $errorSpan = $signUpForm.find('.password span.error');

      assert.ok($errorSpan, "Password error message is not showing");

      fillIn($passwordInput, '1234'); // less than 4
      $passwordInput.trigger('blur');
      assert.ok($errorSpan, "Password is accepting less than 4 characters");

      fillIn($passwordInput, '123456789012345678901');// more than 20
      $passwordInput.trigger('blur');
      assert.ok($errorSpan, "Password is accepting more than 20 characters");

      // Re-Password field
      $errorSpan = $signUpForm.find('.rePassword span.error');

      assert.ok($errorSpan, "RePassword error message is not showing");

      fillIn($rePasswordInput, '1234'); // less than 4
      $rePasswordInput.trigger('blur');
      assert.ok($errorSpan, "RePassword error message is not showing");

      fillIn($rePasswordInput, '123456789012345678901');//more than 20
      $rePasswordInput.trigger('blur');
      assert.ok($errorSpan, "RePassword error message is not showing");

      fillIn($rePasswordInput, 'notTheSame');//passwords dont match
      $rePasswordInput.trigger('blur');
      assert.ok($errorSpan, "RePassword error message is not showing");

      //Valid states
      fillIn($usernameInput, 'gooruTest');
      fillIn($datepickerInput, '11/11/2000');
      fillIn($firstNameInput, 'Gooru');
      fillIn($lastNameInput, 'Goorer');
      fillIn($emailInput, 'gooruTest@goorutest.test');
      fillIn($passwordInput, 'gooruTest123');
      fillIn($rePasswordInput, 'gooruTest123');

      $roleInput.click();


      andThen(function() {

        /*assert.equal(currentURL(), '/');
        assert.ok(!$modal.hasClass('in'), "Modal should have been hidden");

        var $navBar = find('ul.menu-navbar');
        assert.ok($navBar, "Missing Navigation Bar");

        var $profile = $navBar.find('li a.profile span.username');
        assert.ok($profile, "Missing profile");
        assert.equal($profile.text(), "teacher", "Wrong profile text");*/
      });
    });
  });
});
