import Ember from 'ember';

/**
 * Network model with the information about followers and following
 *
 * @typedef {Object} NetworkModel
 */
export default Ember.Object.extend({

  /**
   * @property {numbers} followes - The number of followers
   */
  followerCount: 0,

  /**
   * @property {number} followings - The number of following
   */
  followingCount: 0

});
