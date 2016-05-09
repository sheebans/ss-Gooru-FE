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
  var followings= true;
  this.set('user', user);
  this.set('followings', followings);
  this.render(hbs`{{cards/gru-user-network-card user=user followings=true}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button.btn-info"), "Missing UnFollow Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button")), "Unfollow", "The label button should be Unfollow");
});

test('User Network Card Layout - Follower Filter', function(assert) {
  var user =Ember.Object.create({
    displayName:"Lisa Keller",
    schoolDistrict:"District Name",
    followers:115,
    followings:200,
    isFollowing: true
  });
  var followings= false;
  this.set('user', user);
  this.set('followings', followings);
  this.render(hbs`{{cards/gru-user-network-card user=user followings=followings}}`);
  var $component = this.$();
  const $userNetworkCard = $component.find(".gru-user-network-card");
  T.exists(assert, $userNetworkCard.find(".panel-body .follow-btn button.btn-following"), "Missing Following Button");
  assert.equal(T.text($userNetworkCard.find(".panel-body .follow-btn button")), "Following", "The label button should be Following");
});
