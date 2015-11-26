import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | player', {
  beforeEach: function() {
    authenticateSession(this.application, { isAnonymous: true });
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

