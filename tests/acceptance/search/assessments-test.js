import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/assessments', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'assessments-token',
      user: {
        gooruUId: 'assessments-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  assert.expect(3); //making sure all asserts are called
  visit('/search/assessments?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/assessments?term=any');
    T.exists(assert, find(".collection-results"), "Missing collection-results");
    assert.equal(find(".gru-header .search-input").val(), "any", "Wrong input value");
  });
});


test('Changing term should filter the current result without changing the root url', function(assert) {
  assert.expect(2); //making sure all asserts are called
  visit('/search/assessments?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/assessments?term=any');

    const $appHeader = find('.gru-header');
    const $searchInput = find(".gru-header .search-input");

    fillIn($searchInput, 'europe');
    $searchInput.val('europe');
    $searchInput.change();
    $appHeader.find('form').submit();
    andThen(function(){
      assert.equal(currentURL(), '/search/assessments?term=europe');
    });
  });
});


test('onOpenContentPlayer: When opening a assessment', function(assert) {
  assert.expect(2);
  visit('/search/assessments?term=any');
  andThen(function() {
    const $firstCollectionLink = find(".results div:eq(0) .collection-info a");
    T.exists(assert, $firstCollectionLink, "Missing collection link");
    click($firstCollectionLink); //clicking first collection title
    andThen(function() {
      assert.equal(currentURL(), '/player/76cb53df-1f6a-41f2-a31d-c75876c6bcf9?resourceId=f86f874c-efc9-4100-9cf7-55eb86ec95ae');
    });
  });
});

test('No results found', function(assert) {
  assert.expect(5);
  visit('/search/assessments?term=noResultFound');
  andThen(function() {
    const $assessmentsButton = find(".content-navigation .category-options .assessments");
    T.exists(assert, $assessmentsButton, "Missing assessment filter button");
    click($assessmentsButton); //clicking first collection title
    andThen(function() {
      assert.equal(currentURL(), '/search/assessments?term=noResultFound');
      const $noResultFound = find(".results div.no-results-found");
      T.exists(assert, $noResultFound.find(".title"), "Missing no result found title");
      T.exists(assert, $noResultFound.find("i.remove_circle_outline"), "Missing no result found icon");
      T.exists(assert, $noResultFound.find(".message"), "Missing no result found message");
    });
  });
});


