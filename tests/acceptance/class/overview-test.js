import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/overview', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-overview-token',
      user: {
        gooruUId: 'class-overview-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-10/overview'); //@todo create stubs

  andThen(function() {
    assert.equal(currentURL(), '/class/class-10/overview');

    const $overviewContainer = find(".controller.class .controller.overview");
    T.exists(assert, $overviewContainer, "Missing overview container");
    //@todo add more validations as it is implemented
  });
});
