import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';
import { authenticateSession } from 'gooru-web/tests/helpers/ember-simple-auth';

module('Acceptance | application', {
  beforeEach: function() {
    this.application = startApp();
    authenticateSession(this.application, { isAnonymous: true });
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
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
