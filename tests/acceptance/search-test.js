import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';
import T from 'gooru-web/tests/helpers/assert';

moduleForAcceptance('Acceptance | search', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'search-token',
      user: {
        gooruUId: 'search-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  visit('/search/collections?term=water');

  andThen(function() {
    assert.equal(currentURL(), '/search/collections?term=water');

    const $searchContainer = find(".search");
    T.exists(assert, $searchContainer, "Missing search container");
    T.exists(assert, $searchContainer.find(".filters"), "Missing search filters");
    T.exists(assert, $searchContainer.find(".content"), "Missing search content");
  });
});

test('When collections filter is selected', function(assert) {
  visit('/search/collections?term=water');

  andThen(function() {
    assert.equal(currentURL(), '/search/collections?term=water');

    const collectionsFilterButton = find(".filters .collections");

    click(collectionsFilterButton);

    andThen(function() {
      assert.equal(currentURL(), '/search/collections?collectionType=collection&term=water');

    });
  });
});

test('When assessments filter is selected', function(assert) {
  visit('/search/collections?term=water');

  andThen(function() {
    assert.equal(currentURL(), '/search/collections?term=water');

    const assessmentsFilterButton = find(".filters .assessments");

    click(assessmentsFilterButton);

    andThen(function() {
      assert.equal(currentURL(), '/search/collections?collectionType=assessment&term=water');

    });
  });
});
