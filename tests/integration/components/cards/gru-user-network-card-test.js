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
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button.btn-success"), "Missing Follow Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button")), "Follow", "The label button should be Follow");
});

test('User Network Card Layout - Following Filter', function(assert) {
  var user =Ember.Object.create({
    displayName:"Lisa Keller",
    schoolDistrict:"District Name",
    followers:115,
    followings:200,
    isFollowing: true
  });
  var followingFilter= true;
  this.set('user', user);
  this.set('followingFilter', followingFilter);
  this.render(hbs`{{cards/gru-user-network-card user=user followingFilter=true}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button.btn-following"), "Missing Following Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button.btn-following")), "Following", "The label button should be Following");
});

test('User Network Card Layout - Follower Filter', function(assert) {
  var user =Ember.Object.create({
    displayName:"Lisa Keller",
    schoolDistrict:"District Name",
    followers:115,
    followings:200,
    isFollowing: true
  });
  var followingFilter= false;
  this.set('user', user);
  this.set('followingFilter', followingFilter);
  this.render(hbs`{{cards/gru-user-network-card user=user followingFilter=followingFilter}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button.btn-following"), "Missing Following Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button.btn-following")), "Following", "The label button should be Following");
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

  var followingFilter = true;
  var showUnFollowButton = true;
  this.set('user', user);
  this.set('followingFilter', followingFilter);
  this.set('showUnFollowButton', showUnFollowButton);
  this.render(hbs`{{cards/gru-user-network-card user=user followingFilter=true showUnFollowButton=showUnFollowButton onUnFollowUser='unFollowUser'}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  var $unFollowButton = $userNetworkCard.find(".panel-body .follow-btn button.btn-unfollow");
  T.exists(assert, $unFollowButton, "Missing Unfollow Button");
  assert.equal(T.text($unFollowButton), "Unfollow", "The label button should be Unfollow");

  $unFollowButton.click();
});
