import Ember from 'ember';
import StoreMixin from '../../mixins/store';
import SessionMixin from '../../mixins/session';

/**
 * @typedef {Object} ProfileService
 */
export default Ember.Service.extend(StoreMixin, SessionMixin, {

  findByCurrentUser: function() {
    if (!this.get('session.isAnonymous')) {
      var currentProfileId = this.get('session.userId');
      return this.findById(currentProfileId);
    }
    return null;
  },

  /**
   * Find a user profile by user id
   * @param {string} userId
   * @returns {Profile}
   */
  findByUser: function(userId) {
    //TODO implement, for now it returns the current user
    return this.findByCurrentUser();
  },

  findById: function(profileId) {
    return this.get('store').findRecord('profile', profileId);
  }

});
