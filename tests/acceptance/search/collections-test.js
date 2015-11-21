import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';
import T from 'gooru-web/tests/helpers/assert';
module('Acceptance | search/collections', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Search collections layout', function(assert) {

  andThen(function() {
    assert.expect(2);
    visit('/');

    andThen(function() {
      const $searchButton = find('.search-button');
      const $searchInput = find('.search-input');

      fillIn($searchInput, 'europe');
      click($searchButton);

      andThen(function(){
        assert.equal(currentURL(), '/search/collections?term=europe');
        const $filterSection = find('.search-filter');
        T.exists(assert, $filterSection, "Missing filter section");
      });
    });
  });
});
