import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | features', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      'token-api3': 'user-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Verifying header.enable feature default value', function(assert) {
  visit('/student-home');
  andThen(function() {
    assert.equal(currentURL(), '/student-home');

    const $gruHeader = find('.gru-header');
    T.exists(assert, $gruHeader, 'Missing header');
  });
});

test('Verifying collections.player.reactions feature default value', function(assert) {
  visit('/player/all-resource-types-collection-id?type=collection');

  andThen(function() {
    assert.equal(
      currentURL(),
      '/player/all-resource-types-collection-id?resourceId=image-resource-id&role=teacher&type=collection'
    );
  });
});
