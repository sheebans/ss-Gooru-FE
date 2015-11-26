import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | application', {
  beforeEach: function() {
    authenticateSession(this.application, { isAnonymous: true });
  }
});

test('searchTerm: Search box navigation', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(2); //making sure all asserts are called

    assert.equal(currentURL(), '/');

    //hero
    const $appHeader = find('.gru-header');
    const $searchButton = $appHeader.find(".search-button");
    const $searchInput = $appHeader.find(".search-input");

    fillIn($searchInput, 'europe');
    click($searchButton);

    andThen(function(){
      assert.equal(currentURL(), '/search/collections?term=europe');
    });
  });
});
