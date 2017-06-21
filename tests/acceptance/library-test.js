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
  assert.expect(8);
  visit('/library');

  andThen(function () {
    assert.equal(currentURL(), '/library');

    const $libraries = find('.libraries');
    assert.ok($libraries.length,'Missing libraries controller');
    assert.ok($libraries.find('.content.gru-header'),'Missing library header');

    let $options = $libraries.find('.tab');
    assert.ok($options.filter('.featured-courses').length, 'Featured Courses tab is missing');
    assert.ok($options.filter('.other-libraries').length, 'Other Libraries tab is missing');
    assert.ok($libraries.find('#featured-courses'),'Missing Featured Courses Section');
    assert.equal($libraries.find('#featured-courses .gru-collection-card').length, 2, 'It should show 2 cards');

    $libraries.find('a.other-libraries').click();
    andThen(function() {
      assert.ok($libraries.find('#other-libraries'),'Missing Other Libraries Section');
    });
  });
});
