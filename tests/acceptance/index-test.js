import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from 'gooru-web/tests/helpers/start-app';
import T from 'gooru-web/tests/helpers/assert';

module('Acceptance | index', {
  beforeEach: function() {
    this.application = startApp();
  },

  afterEach: function() {
    Ember.run(this.application, 'destroy');
  }
});

test('Page Layout', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(7); //making sure all asserts are called

    assert.equal(currentURL(), '/');

    //hero
    var $hero = find('.hero');
    T.exists(assert, $hero, "Missing hero section");
    T.exists(assert, $hero.find("h1"), "Missing hero title");

    var $freeAndOpen = find('.free_and_open');
    T.exists(assert, $freeAndOpen, "Missing free and open section");
    T.exists(assert, $freeAndOpen.find("h1"), "Missing free and open  title");
    T.exists(assert,$freeAndOpen.find('.free_and_open_descrip'),"Missing free and open description");
    T.exists(assert,$freeAndOpen.find('.free_and_open_button'),"Missing free and open button");

  });
});


test('Search box navigation', function(assert) {
  visit('/');

  andThen(function() {
    assert.expect(2); //making sure all asserts are called

    assert.equal(currentURL(), '/');

    //hero
    const $appHeader = find('.app-header');
    const $searchButton = $appHeader.find(".search-button");
    const $searchInput = $appHeader.find(".search-input");

    fillIn($searchInput, 'test');
    click($searchButton);

    andThen(function(){
      assert.equal(currentURL(), '/search/collections?term=test');
    });

  });
});
