import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

module('Acceptance | player', {
  beforeEach: function() {
    this.application = startApp();
    authenticateSession(this.application, { isAnonymous: true });
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Layout', function(assert) {
  assert.expect(0);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');

  andThen(function() {

  });
});

test('closePlayer: When closing the player', function(assert) {
  assert.expect(0);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function() {

  });
});

test('submitQuestion: When submitting the question', function(assert) {
  assert.expect(0);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function() {

  });
});

test('selectNavigatorItem: When moving to another resource', function(assert) {
  assert.expect(0);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function() {

  });
});

test('openNavigator: When opening the navigator', function(assert) {
  assert.expect(0);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function() {

  });
});

test('closeNavigator: When closing navigator', function(assert) {
  assert.expect(0);
  visit('/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9');
  andThen(function() {

  });
});

