import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | index', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'token-value'
    });
  }
});

test('load: Layout', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(2);

    assert.equal(currentURL(), '/sign-in');

    //hero
    var $signIn = find('.sign-in');
    T.exists(assert, $signIn, "Missing sign-in");
  });
});
