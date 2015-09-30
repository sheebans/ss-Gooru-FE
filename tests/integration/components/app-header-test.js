import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';

moduleForComponent('app-header', 'Integration | Component | app header', {
  integration: true,
  beforeEach: function () {
    this.container.lookup('service:i18n').set("locale","en");
  }
});

test('header layout', function(assert) {
  assert.expect(13); //making sure all asserts are called

  this.on('myAuthenticateAction', function(){
    assert.ok(false, "onAuthenticateAction should not be called");
  });

  this.render(hbs`{{app-header onAuthenticateAction=myAuthenticateAction}}`);

  var $component = this.$(); //component dom element

  T.exists(assert, $component.find("header.app-header"), "Root element not found");

  T.exists(assert, $component.find("#login-modal"), "Missing login modal");

  var $navHeader = $component.find(".navbar-header");
  T.exists(assert, $navHeader, "Missing nav header");
  T.exists(assert, $navHeader.find(".home-link"), "Missing home link");

  var $navSearch = $component.find(".search-navbar-form");
  T.exists(assert, $navSearch, "Missing nav search form");
  T.exists(assert, $navSearch.find(".search-button"), "Missing search button");
  T.exists(assert, $navSearch.find(".search-input"), "Missing search input");

  var $navMenu = $component.find(".menu-navbar");
  T.exists(assert, $navMenu.find(".libraries-link"), "Missing libraries link");
  T.exists(assert, $navMenu.find(".my-classes-link"), "Missing my classes link");
  T.exists(assert, $navMenu.find(".my-content-link"), "Missing my content link");
  T.exists(assert, $navMenu.find(".login-link"), "Missing login link");
  T.exists(assert, $navMenu.find(".sign-up-button"), "Missing sign up button");
  T.notExists(assert, $navMenu.find(".user-logged"), "User info should not be present");

});

test('header layout with user', function(assert) {
  assert.expect(4); //making sure all asserts are called

  this.set('myUser', Ember.Object.create({ username: 'jperez' }));

  this.render(hbs`{{app-header user=myUser}}`);

  var $component = this.$(); //component dom element

  var $navMenu = $component.find(".menu-navbar");
  T.notExists(assert, $navMenu.find(".login-link"), "Missing login link");

  T.exists(assert, $navMenu.find(".profile .username"), "User info should not be present");
  assert.equal(T.text($navMenu.find(".profile .username")), "jperez", "Wrong username");

  T.exists(assert, $navMenu.find(".settings"), "Missing settings icon");

});
