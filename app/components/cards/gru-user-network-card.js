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
      var countFollowers = component.get('countFollowers');

      component.set('countFollowers', countFollowers-1);
      component.sendAction("onUnFollowUser", user);
      user.set('isFollowing', false);
    },

    setFollow:function(){
      var component = this;
      var user = component.get('user');
      var countFollowers = component.get('countFollowers');

      component.set('countFollowers', countFollowers+1);
      user.set('isFollowing', true);
      component.sendAction("onFollowUser", user);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {User} user
   */
  user: null,

  /**
   * @property {Number} counter of user followers
   */
  countFollowers: Ember.computed.alias("user.followers")

});
