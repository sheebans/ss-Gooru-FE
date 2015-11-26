import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import startApp from 'gooru-web/tests/helpers/start-app';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class/info', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-info-token',
      user: {
        gooruUId: 'class-info-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-10/info'); //@todo create stubs

  andThen(function() {
    assert.equal(currentURL(), '/class/class-10/info');

    const $overviewContainer = find(".controller.class .controller.info");
    T.exists(assert, $overviewContainer, "Missing overview container");
    //@todo add more validations as it is implemented
  });
});
