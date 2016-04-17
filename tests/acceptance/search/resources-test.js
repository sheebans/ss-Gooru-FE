import { test } from 'qunit';
import moduleForAcceptance from 'gooru-web/tests/helpers/module-for-acceptance';
import T from 'gooru-web/tests/helpers/assert';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

moduleForAcceptance('Acceptance | search/resources', {
  beforeEach: function() {
    authenticateSession(this.application, {
      isAnonymous: true,
      token: 'resources-token',
      user: {
        gooruUId: 'resources-token-user-id'
      }
    });
  }
});

test('Layout', function(assert) {
  assert.expect(4); //making sure all asserts are called
  visit('/search/resources?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/resources?term=any');
    T.exists(assert, find(".gru-resource-options"), "Missing gru-resource-options menu");
    T.exists(assert, find(".gru-resource-results"), "Missing gru-resource-results");
    assert.equal(find(".gru-header .search-input").val(), "any", "Wrong input value");
  });
});

test('Apply filters', function(assert) {
  assert.expect(5); //making sure all asserts are called
  visit('/search/resources?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/resources?term=any');
    T.exists(assert, find(".gru-resource-options"), "Missing gru-resource-options menu");
    T.exists(assert, find(".gru-resource-results"), "Missing gru-resource-results");
    assert.equal(find(".gru-header .search-input").val(), "any", "Wrong input value");

    click(find(".gru-resource-options .video"));
    andThen(function(){
      assert.equal(currentURL(), '/search/resources?selectedOptionTypes=%5B%22video%22%5D&term=any');
    });
  });
});

test('Changing term should filter the current result without changing the root url', function(assert) {
  assert.expect(2); //making sure all asserts are called
  visit('/search/resources?term=any');
  andThen(function() {
    assert.equal(currentURL(), '/search/resources?term=any');

    const $appHeader = find('.gru-header');
    const $searchInput = find(".gru-header .search-input");

    fillIn($searchInput, 'europe');
    $searchInput.val('europe');
    $searchInput.change();
    $appHeader.find('form').submit();
    andThen(function(){
      assert.equal(currentURL(), '/search/resources?term=europe');
    });
  });
});



