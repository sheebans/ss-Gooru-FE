import Ember from 'ember';
/**
 * User Network card
 *
 * Component responsible of showing the user network information in cards, so that most useful information is summarized there.
 * @module
 */
export default Ember.Component.extend({
  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------
  // Attributes

  classNames:['cards','gru-user-network-card'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    unFollow:function(){

      var component = this;
      var user = component.get('user');
      var followingFilter = component.get('followingFilter');

      if(followingFilter){
        component.sendAction("onUnFollowUser", user);
      }
      else {
        user.set('isFollowing',false);
      }
    },

    setFollow:function(){
      var user = this.get('user');

      user.set('isFollowing',true);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  /**
   * DidInsertElement ember event
   */
  didInsertElement: function(){
    var component = this;

    this.$(".btn-following")
      .mouseover(function() {
        component.set('showUnFollowButton', true);
      });

    this.$(".btn-unfollow")
      .mouseout(function() {
        component.set('showUnFollowButton', false);
      });
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {User} user
   */
  user: null,
  /**
   * @property {Boolean} followingFilter
   */
  followingFilter: false,
  /**
   * @property {Boolean} showUnFollowButton
   */
  showUnFollowButton: false

});
