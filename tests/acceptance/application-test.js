import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | application', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'token-value'
    });
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

test('Theme support', function(assert) {
  visit('/?themeId=edify');

  andThen(function() {
    assert.expect(2); //making sure all asserts are called

    assert.equal(currentURL(), '/?themeId=edify');

    T.exists(assert, find("#edify"), "Missing html element having theme id");

    const $styleLink = find("#theme-style-link");
    T.exists(assert, $styleLink, "Missing link element having theme style");
    assert.equal($styleLink.attr("src"), "assets/themes/edify/styles.css", "Wrong style url");

    assert.equal(T.text(find("#edify .gru-header .search-button")), 'Buscar', "Wrong title for search button");
  });
});
