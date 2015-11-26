import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('gru-header', 'Integration | Component | Header', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('header layout', function(assert) {
  assert.expect(13); //making sure all asserts are called

  this.set('session', Ember.Object.create({isAnonymous: true}));

  this.on('myAuthenticateAction', function() {
    assert.ok(false, "onAuthenticateAction should not be called");
  });

  this.render(hbs`{{gru-header session=session onAuthenticateAction='myAuthenticateAction'}}`);

  var $component = this.$(); //component dom element

  T.exists(assert, $component.find("header.gru-header"), "Root element not found");

  T.exists(assert, $component.find(".login-modal"), "Missing login modal");

  var $navHeader = $component.find(".navbar-header");
  T.exists(assert, $navHeader, "Missing nav header");
  T.exists(assert, $navHeader.find(".home-link"), "Missing home link");

  var $navSearch = $component.find(".search-navbar-form");
  T.exists(assert, $navSearch, "Missing nav search form");
  T.exists(assert, $navSearch.find(".search-button"), "Missing search button");
  T.exists(assert, $navSearch.find(".search-input"), "Missing search input");

  var $navMenu = $component.find(".menu-navbar");
  T.exists(assert, $navMenu.find(".libraries-link"), "Missing libraries link");
  T.notExists(assert, $navMenu.find(".my-classes-link"), "Link should be available for authenticated users only");
  T.exists(assert, $navMenu.find(".my-content-link"), "Missing my content link");
  T.exists(assert, $navMenu.find(".login-link"), "Missing login link");
  T.exists(assert, $navMenu.find(".sign-up-button"), "Missing sign up button");
  T.notExists(assert, $navMenu.find(".user-logged"), "User info should not be present");

});

test('header layout with user', function(assert) {
  assert.expect(4); //making sure all asserts are called

  this.set('session', Ember.Object.create({
    isAnonymous: false,
    userData: {username: 'jperez'}
  }));

  this.render(hbs`{{gru-header session=session}}`);

  const $component = this.$(); //component dom element

  const $navMenu = $component.find(".menu-navbar");
  T.notExists(assert, $navMenu.find(".login-link"), "Missing login link");

  T.exists(assert, $navMenu.find(".profile .username"), "User info should not be present");
  assert.equal(T.text($navMenu.find(".profile .username")), "jperez", "Wrong username");

  T.exists(assert, $navMenu.find(".settings"), "Missing settings icon");

});

test('Do search by clicking search button', function(assert) {
  assert.expect(4); //making sure all asserts are called

  this.on('mySearchAction', function(term){
    assert.equal(term, "test", "onSearchAction should be called once");
  });

  this.render(hbs`{{gru-header user=myUser onSearch='mySearchAction'}}`);

  const $component = this.$(); //component dom element

  const $navSearch = $component.find(".search-navbar-form");
  T.exists(assert, $navSearch, "Missing nav search form");
  T.exists(assert, $navSearch.find(".search-button"), "Missing search button");
  T.exists(assert, $navSearch.find(".search-input"), "Missing search input");

  const $searchInput = $navSearch.find(".search-input");
  $searchInput.val("test");
  $searchInput.change();

  const $searchButton = $navSearch.find(".search-button");
  $searchButton.click();
});


test('Do search by hitting Enter', function(assert) {
  assert.expect(1); //making sure all asserts are called

  const ANY_TERM = 'any term';

  this.on('searchAction', function(term){
    assert.equal(term, ANY_TERM, 'onSearchAction should be called once');
  });

  this.render(hbs`{{gru-header onSearch='searchAction'}}`);

  var $searchInput = this.$('.search-input');
  $searchInput.val(ANY_TERM);
  $searchInput.change();
  this.$('form').submit();
});

test('Disabled Search Button', function(assert) {
  this.render(hbs`{{gru-header}}`);
  assert.equal($('.search-button').attr("disabled"),'disabled',"Button should be disabled");
});

test('Enable Search Button', function(assert) {
  this.render(hbs`{{gru-header term='test'}}`);
  assert.equal($('.search-button').attr("disabled"),null, "Button should be enable");
});
