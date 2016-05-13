import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import T from 'gooru-web/tests/helpers/assert';
import Ember from 'ember';
moduleForComponent('cards/gru-user-network-card', 'Integration | Component | cards/gru user network card', {
  integration: true
});

test('User Network Card Layout', function(assert) {
  var user =Ember.Object.create({
    fullNameInformal:"Lisa Keller",
    districtName:"District Name",
    totalFollowers:115,
    totalFollowing:200,
    isFollowing: false
  });
  this.set('user', user);
  this.render(hbs`{{cards/gru-user-network-card user=user}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  T.exists(assert, $userNetworkCard.find(".panel-heading .image img"), "Missing User Image");
  T.exists(assert, $userNetworkCard.find(".panel-heading .user-info .name"), "Missing User Name");
  T.exists(assert, $userNetworkCard.find(".panel-heading .user-info .district"), "Missing Distric Name");
  T.exists(assert, $userNetworkCard.find(".panel-body .followers .count span"), "Missing Followers Count");
  T.exists(assert, $userNetworkCard.find(".panel-body .followers .description"), "Missing Followers Label");
  T.exists(assert, $userNetworkCard.find(".panel-body .following .count span"), "Missing Following Count");
  T.exists(assert, $userNetworkCard.find(".panel-body .following .description"), "Missing Following Label");
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button.btn-follow"), "Missing Follow Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button.btn-follow")), "Follow", "The label button should be Follow");
});

test('User Network Card Layout - Following Filter', function(assert) {
  var user =Ember.Object.create({
    displayName:"Lisa Keller",
    schoolDistrict:"District Name",
    followers:115,
    followings:200,
    isFollowing: true
  });
  this.set('user', user);

  this.render(hbs`{{cards/gru-user-network-card user=user}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button"), "Missing Following Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button span.following")), "Following", "The label button should be Following");
});

test('User Network Card Layout - Followers Filter', function(assert) {
  var user =Ember.Object.create({
    displayName:"Lisa Keller",
    schoolDistrict:"District Name",
    followers:115,
    followings:200,
    isFollowing: true
  });

  this.set('user', user);

  this.render(hbs`{{cards/gru-user-network-card user=user}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button"), "Missing Following Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button span.following")), "Following", "The label button should be Following");
});

test('User Network Card Layout - Following Filter - unFollow implementation', function(assert) {
  var user =Ember.Object.create(
    {
      displayName:"Lisa Keller",
      schoolDistrict:"District Name",
      followers:115,
      followings:200,
      isFollowing: true
    });

  this.on('unFollowUser', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.set('user', user);

  this.render(hbs`{{cards/gru-user-network-card user=user onUnFollowUser='unFollowUser'}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  var $unFollowButton = $userNetworkCard.find(".panel-body .follow-btn button");
  T.exists(assert, $unFollowButton, "Missing Unfollow Button");
  assert.equal(T.text($unFollowButton.find("span.unfollow")), "Unfollow", "The label button should be Unfollow");

  $unFollowButton.click();
});

test('User Network Card Layout - Followers Filter - Follow implementation', function(assert) {
  var user =Ember.Object.create(
    {
      displayName:"Lisa Keller",
      schoolDistrict:"District Name",
      followers:115,
      followings:200,
      isFollowing: false
    });

  this.on('followUser', function(){
    assert.ok(true, 'external Action was called!');
  });

  this.set('user', user);

  this.render(hbs`{{cards/gru-user-network-card user=user onFollowUser='followUser'}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  var $followButton = $userNetworkCard.find(".panel-body .follow-btn button.btn-follow");
  T.exists(assert, $followButton, "Missing Follow Button");
  assert.equal(T.text($followButton), "Follow", "The label button should be Follow");

  $followButton.click();
});
