import DS from 'ember-data';

/**
 * Model to represent the Profiles objects with the User information
 *
 * @typedef {Object} Profile
 */
export default DS.Model.extend({

  /**
   * @property {string} profileId
   */
  profileId: DS.attr('string'),

  /**
   * @property {string} aboutMe
   */
  aboutMe: DS.attr('string'),

  /**
   * @property {Number} followers - Number of followers that the user has
   */
  followers: DS.attr('number'),

  /**
   * @property {Number} followings - Number of people that the user is following
   */
  followings: DS.attr('number'),

  /**
   * @property {User} user
   */
  user: DS.belongsTo('user/user')

});
