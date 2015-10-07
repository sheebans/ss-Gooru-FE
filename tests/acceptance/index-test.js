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

    assert.expect(25); //making sure all asserts are called

    assert.equal(currentURL(), '/');

    //hero
    var $hero = find('.hero');
    T.exists(assert, $hero, "Missing hero section");
    T.exists(assert, $hero.find("h1"), "Missing hero title");

    var $empowerStudents  = find('.empowerStudents');
    T.exists(assert, $empowerStudents, "Missing empower students section");
    T.exists(assert, $empowerStudents.find("h3"), "Missing empower students title");

    var $empowerStudentsFind  = find('.find');
    T.exists(assert, $empowerStudentsFind, "Missing empower students find section");
    T.exists(assert, $empowerStudentsFind.find("h3"), "Missing empower students find title");
    T.exists(assert, $empowerStudentsFind.find('.findImg'), "Missing empower students find image");
    T.exists(assert, $empowerStudentsFind.find("p"), "Missing empower students find description");

    var $empowerStudentsRemix  = find('.remix');
    T.exists(assert, $empowerStudentsRemix, "Missing empower students remix section");
    T.exists(assert, $empowerStudentsRemix.find("h3"), "Missing empower students remix title");
    T.exists(assert, $empowerStudentsRemix.find('.remixImg'), "Missing empower students remix image");
    T.exists(assert, $empowerStudentsRemix.find("p"), "Missing empower students remix description");

    var $empowerStudentsShare  = find('.share');
    T.exists(assert, $empowerStudentsShare, "Missing empower students share section");
    T.exists(assert, $empowerStudentsShare.find("h3"), "Missing empower students share title");
    T.exists(assert, $empowerStudentsShare.find('.shareImg'), "Missing empower students share image");
    T.exists(assert, $empowerStudentsShare.find("p"), "Missing empower students share description");

    var $empowerStudentsMonitor  = find('.monitor');
    T.exists(assert, $empowerStudentsMonitor, "Missing empower students monitor section");
    T.exists(assert, $empowerStudentsMonitor.find("h3"), "Missing empower students monitor title");
    T.exists(assert, $empowerStudentsMonitor.find('.monitorImg'), "Missing empower students monitor image");
    T.exists(assert, $empowerStudentsMonitor.find("p"), "Missing empower students monitor description");

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
