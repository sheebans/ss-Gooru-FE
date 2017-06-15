import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | library', {
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

test('Library Controller Layout', function (assert) {
  assert.expect(5);
  visit('/library');

  andThen(function () {
    assert.equal(currentURL(), '/library');

    const $libraries = find('.libraries');
    assert.ok($libraries.length,'Missing libraries controller');
    assert.ok($libraries.find('.content.gru-header'),'Missing library header');

    let $options = $libraries.find('.tab');
    assert.ok($options.filter('.featured-courses').length, 'Browse Library tab is missing');
    assert.ok($libraries.find('#featured-courses'),'Missing Browse Library Section');
  });
});
