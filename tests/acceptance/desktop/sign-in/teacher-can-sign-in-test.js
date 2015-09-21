import Ember from 'ember';
import startApp from 'gooru-web/tests/helpers/start-app';
import { module, test } from 'qunit';


var application;

module('Acceptance: TeacherCanSignIn', {

  setup: function() {
    application = startApp();
  },

  teardown: function() {
    Ember.run(application, 'destroy');
  }

});

test('visiting /sign-in', function(assert) {
  visit('/sign-in');
  andThen(function() {
    assert.equal(currentURL(), '/sign-in');
  });

  fillIn('#username', 'teacher');
  fillIn('#password', 'password');
  click('#sign-in');
  andThen(function() {
    assert.equal(currentURL(), '/');
  });


});
