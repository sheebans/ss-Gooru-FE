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
    T.exists(assert, find(".collection-results"), "Missing collection-results");
    assert.equal(find(".gru-header .search-input").val(), "any", "Wrong input value");
  });
});


test('Changing term should filter the current result without changing the root url', function(assert) {
  assert.expect(2); //making sure all asserts are called
  visit('/search/collections?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/collections?term=any');

    const $appHeader = find('.gru-header');
    const $searchInput = find(".gru-header .search-input");

    fillIn($searchInput, 'europe');
    $searchInput.val('europe');
    $searchInput.change();
    $appHeader.find('form').submit();
    andThen(function(){
      assert.equal(currentURL(), '/search/collections?term=europe');
    });
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
      assert.equal(currentURL(), '/player/aa403746-9344-489b-b405-8989d2737532?resourceId=f86f874c-efc9-4100-9cf7-55eb86ec95ae');
    });
  });
});

test('No results found', function(assert) {
  assert.expect(5);
  visit('/search/collections?term=noResultFound');
  andThen(function() {
    const $collectionsButton = find(".content-navigation .category-options .collections");
    T.exists(assert, $collectionsButton, "Missing assessment filter button");
    click($collectionsButton); //clicking first collection title
    andThen(function() {
      assert.equal(currentURL(), '/search/collections?term=noResultFound');
      const $noResultFound = find(".results div.no-results-found");
      T.exists(assert, $noResultFound.find(".title"), "Missing no result found title");
      T.exists(assert, $noResultFound.find("i.remove_circle_outline"), "Missing no result found icon");
      T.exists(assert, $noResultFound.find(".message"), "Missing no result found message");
    });
  });
});


