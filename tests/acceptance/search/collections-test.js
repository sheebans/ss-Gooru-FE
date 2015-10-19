import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';
//import T from 'gooru-web/tests/helpers/assert';
module('Acceptance | search/collections', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('visiting /search/collections', function(assert) {

  andThen(function() {
    assert.expect(1);
    // @TODO currentURL() is not working as expected. Latest version is broken, meanwhile I am applying a patch here\
    //assert.equal(currentURL(), '/search/collections');
    visit('/');

    andThen(function() {
      const $searchButton = find('.search-button');
      click($searchButton);
      andThen(function(){
        assert.equal(currentURL(), '/search/collections?term=null');
        //const $filterSection = find('.search-filter');
        //T.exists(assert, $filterSection, "Missing filter section");
      });
    });
  });
});
