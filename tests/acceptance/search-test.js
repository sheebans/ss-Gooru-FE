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
    T.exists(assert, $searchContainer.find(".content-navigation"), "Missing content-navigation");

    const $contentNavContainer = $searchContainer.find(".content-navigation");
    T.exists(assert, $contentNavContainer, "Missing content navigator container");


    const $categoryBtns = $contentNavContainer.find(".btn-category");
    T.exists(assert, $categoryBtns, "Missing category buttons");

    assert.equal($categoryBtns.length, 4, "Incorrect number of category buttons");

    const $collectionButton =$contentNavContainer.find('.collections');
    T.exists(assert, $collectionButton, "Missing collections button");
    T.exists(assert, $collectionButton.find('i'), "Missing icon collections button");
    assert.equal(T.text($collectionButton.find('span')), "Collections", "Incorrect collections button text");

    const $assessmentsButton =$contentNavContainer.find('.assessments');
    T.exists(assert, $assessmentsButton, "Missing assessments button");
    T.exists(assert, $assessmentsButton.find('i'), "Missing icon assessments button");
    assert.equal(T.text($assessmentsButton.find('span')), "Assessments", "Incorrect assessments button text");

    const $resourcesButton =$contentNavContainer.find('.resources');
    T.exists(assert, $resourcesButton, "Missing resources button");
    T.exists(assert, $resourcesButton.find('i'), "Missing icon resources button");
    assert.equal(T.text($resourcesButton.find('span')), "Resources", "Incorrect resources button text");

    const $questionsButton =$contentNavContainer.find('.questions');
    T.exists(assert, $questionsButton, "Missing questions button");
    T.exists(assert, $questionsButton.find('i'), "Missing icon questions button");
    assert.equal(T.text($questionsButton.find('span')), "Questions", "Incorrect questions button text");

    const $standardsButton = $contentNavContainer.find('.standards button');
    T.exists(assert, $standardsButton, "Missing standards button");

    T.exists(assert, $searchContainer.find(".content"), "Missing search content");
  });
});

test('When collections filter is selected', function(assert) {
  visit('/search/collections?term=water');

  andThen(function() {
    assert.equal(currentURL(), '/search/collections?term=water');

    const collectionsFilterButton = find(".content-navigation .category-options .collections");

    click(collectionsFilterButton);

    andThen(function() {
      assert.equal(currentURL(), '/search/collections?term=water');

    });
  });
});

test('When assessments filter is selected', function(assert) {
  visit('/search/collections?term=water');

  andThen(function() {
    assert.equal(currentURL(), '/search/collections?term=water');

    const assessmentsFilterButton = find(".content-navigation .category-options .assessments");

    click(assessmentsFilterButton);

    andThen(function() {
      assert.equal(currentURL(), '/search/assessments?term=water');

    });
  });
});
test('Special character search', function(assert) {
  visit('/');

  andThen(function() {
    const $searchInput = find(".search-navbar-form input");
    $searchInput.find("input").val('!@#$%^&*()');
    $searchInput.find("input").blur();

    return wait().then(function () {
      assert.ok(find(".results .no-results-found"), 'No results found should be appear');
    });
  });
});
