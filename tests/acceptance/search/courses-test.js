import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/courses', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'collections-token',
      user: {
        gooruUId: 'collections-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  assert.expect(4); //making sure all asserts are called
  visit('/search/courses?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/courses?term=any');
    assert.ok(find('.courses-results').length, 'Missing courses-results');
    assert.notOk(
      find('.gru-search-filter').length,
      'Filters should not be visible'
    );
    assert.equal(
      find('.gru-header .search-input').val(),
      'any',
      'Wrong input value'
    );
  });
});

test('Changing term should filter the current result without changing the root url', function(
  assert
) {
  assert.expect(2); //making sure all asserts are called
  visit('/search/courses?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/courses?term=any');

    const $appHeader = find('.gru-header');
    const $searchInput = find('.gru-header .search-input');

    fillIn($searchInput, 'europe');
    $searchInput.val('europe');
    $searchInput.change();
    $appHeader.find('form').submit();
    andThen(function() {
      assert.equal(currentURL(), '/search/courses?term=europe');
    });
  });
});
