import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

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
  assert.expect(9);
  visit('/library');

  andThen(function () {
    assert.equal(currentURL(), '/library');

    const $libraries = find('.libraries');
    assert.ok($libraries.length,'Missing libraries controller');
    assert.ok($libraries.find('.content.gru-header'),'Missing library header');

    let $options = $libraries.find('.tab');
    assert.ok($options.filter('.featured-courses').length, 'Featured Courses tab is missing');
    assert.ok($options.filter('.partner-libraries').length, 'Partner Libraries tab should appear');
    assert.ok($libraries.find('#featured-courses'),'Missing Featured Courses Section');
    assert.equal($libraries.find('#featured-courses .gru-collection-card').length, 2, 'It should show 2 cards');

    $libraries.find('a.partner-libraries').click();
    andThen(function() {
      assert.ok($libraries.find('#partner-libraries'),'Missing Partner Libraries Section');
      assert.equal($libraries.find('#partner-libraries .gru-partner-library-card').length, 4, "It should show 4 cards");
    });
  });
});

test('Take A Tour', function(assert){
  assert.expect(2);
  visit('/library');
  andThen(function() {
    let $tooltip;
    click(".app-container .gru-take-tour button.start-tour");
    andThen(function() {
      $tooltip = $("div.introjs-tooltip");

      T.exists(assert, $tooltip, "First step of the tour should display a tooltip");
      assert.equal(T.text($tooltip.find('.tour-header h2')), 'Welcome!', 'First step title should be "Welcome!"');
    });
  });
});
