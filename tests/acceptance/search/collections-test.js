import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/collections', {
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
  assert.expect(3); //making sure all asserts are called
  visit('/search/collections?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/collections?term=any');
    T.exists(assert, find(".search-filter"), "Missing search filters");
    T.exists(assert, find(".collection-results .results"), "Missing collection results");
  });
});

test('onOpenContentPlayer: When opening a collection', function(assert) {
  assert.expect(2);
  visit('/search/collections?term=any');
  andThen(function() {
    const $firstCollectionLink = find(".results div:eq(0) .collection-info a");
    T.exists(assert, $firstCollectionLink, "Missing collection link");
    click($firstCollectionLink); //clicking first collection title
    andThen(function() {
      assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=f86f874c-efc9-4100-9cf7-55eb86ec95ae');
    });
  });
});

test('filterType: When filtering by assessments', function(assert) {
  assert.expect(3);
  visit('/search/collections?term=any');
  andThen(function() {
    const $assessmentButton = find(".search-filter-options .assessments");
    T.exists(assert, $assessmentButton, "Missing assessment filter button");
    click($assessmentButton); //clicking first collection title
    andThen(function() {
      assert.equal(currentURL(), '/search/collections?term=any');
      assert.equal(find(".results div.gru-collection-card").length, 9, "Search should return only 9 assessments");
    });
  });
});

test('searchTerm: Search by term when user is already at the results page', function(assert) {
  assert.expect(2); //making sure all asserts are called
  visit('/search/collections?term=any');
  andThen(function() {
    const $appHeader = find('.gru-header');
    const $searchInput = $appHeader.find(".search-input");

    fillIn($searchInput, 'europe');
    $searchInput.val('europe');
    $searchInput.change();

    $appHeader.find('form').submit();

    andThen(function(){
      assert.equal(currentURL(), '/search/collections?term=europe');
      assert.equal(find(".results div.gru-collection-card").length, 1, "Europe search should return 1 collection");
    });
  });
});

