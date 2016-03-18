import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/questions', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'questions-token',
      user: {
        gooruUId: 'questions-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  assert.expect(3); //making sure all asserts are called
  visit('/search/questions?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/questions?term=any');
    T.exists(assert, find(".gru-question-options"), "Missing gru-question-options menu");
    T.exists(assert, find(".gru-resource-results"), "Missing gru-resource-results");
  });
});
