import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | Edit Rubric', {
  beforeEach: function () {
    authenticateSession(this.application, {
      isAnonymous: false,
      token: 'profile-token',
      user: {
        gooruUId: 'id-for-pochita'
      }
    });
  }
});

test('Layout', function (assert) {
  visit('/content/rubric/edit');

  andThen(function () {
    assert.equal(currentURL(), '/content/rubric/edit');

    var $container = find('.rubric.edit');
    assert.ok($container.length, 'Missing rubric controller');
    assert.ok($container.find('.gru-rubric-edit').length, 'Missing rubric edit component');
    assert.ok($container.find('.gru-fixed-footer').length, 'Missing footer fixed component');
  });
});

test('Cancel edit', function (assert) {
  visit('/content/rubric/edit');

  andThen(function () {
    assert.equal(currentURL(), '/content/rubric/edit');

    var $container = find('.rubric.edit');
    var $cancel = $container.find('.gru-fixed-footer button.cancel');
    click($cancel);
    andThen(function () {
      assert.equal(currentURL(), '/id-for-pochita/content/courses');
    });
  });
});
