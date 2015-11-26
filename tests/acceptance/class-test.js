import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | class', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'class-token',
      user: {
        gooruUId: 'class-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/class/class-10'); //@todo create stubs

  andThen(function() {
    assert.equal(currentURL(), '/class/class-10');

    const $classContainer = find(".controller.class");
    T.exists(assert, $classContainer, "Missing class container");
    T.exists(assert, $classContainer.find(".navigation"), "Missing class navigation");
    T.exists(assert, $classContainer.find(".content"), "Missing class content");
  });
});
