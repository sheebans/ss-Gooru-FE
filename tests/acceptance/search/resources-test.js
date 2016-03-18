import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/resources', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'resources-token',
      user: {
        gooruUId: 'resources-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  assert.expect(3); //making sure all asserts are called
  visit('/search/resources?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/resources?term=any');
    T.exists(assert, find(".gru-resource-options"), "Missing gru-resource-options menu");
    T.exists(assert, find(".gru-resource-results"), "Missing gru-resource-results menu");
  });
});
