import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/questions', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'questions-token',
      user: {
        gooruUId: 'questions-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  assert.expect(4); //making sure all asserts are called
  visit('/search/questions?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/questions?term=any');
    T.exists(assert, find(".gru-question-options"), "Missing gru-question-options menu");
    T.exists(assert, find(".gru-resource-results"), "Missing gru-resource-results");
    assert.equal(find(".gru-header .search-input").val(), "any", "Wrong input value");
  });
});


test('Apply filters', function(assert) {
  assert.expect(5); //making sure all asserts are called
  visit('/search/questions?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/questions?term=any');
    T.exists(assert, find(".gru-question-options"), "Missing gru-question-options menu");
    T.exists(assert, find(".gru-resource-results"), "Missing gru-resource-results");
    assert.equal(find(".gru-header .search-input").val(), "any", "Wrong input value");

    click(find(".gru-question-options .multiple-choice"));
    andThen(function(){
      assert.equal(currentURL(), '/search/questions?selectedOptionTypes=%5B%22MC%22%5D&term=any');
    });
  });
});

test('Changing term should filter the current result without changing the root url', function(assert) {
  assert.expect(2); //making sure all asserts are called
  visit('/search/questions?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/questions?term=any');

    const $appHeader = find('.gru-header');
    const $searchInput = find(".gru-header .search-input");

    fillIn($searchInput, 'europe');
    $searchInput.val('europe');
    $searchInput.change();
    $appHeader.find('form').submit();
    andThen(function(){
      assert.equal(currentURL(), '/search/questions?term=europe');
    });
  });
});
