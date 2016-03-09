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
    setFollow:function(){
      this.set('isFollowing',true);
    },
  },
  // -------------------------------------------------------------------------
  // Properties
  /**
   * @property {User} user
   */
  user: null,
  /**
   * @property {Boolean} isFollowing
   */
  isFollowing:false,

});
