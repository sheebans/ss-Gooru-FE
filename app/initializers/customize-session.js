import Ember from 'ember';
import Session from 'ember-simple-auth/session';

/**
 * Custom session
 */
var SessionWithCurrentUser = Session.extend({

  /**
   * Returns the current user if available
   * @return {*} user
   */
  currentUser: function() {
    var userId = this.get('user_id');
    if (!Ember.isEmpty(userId)) {
      return this.container.lookup('store:main').find('user', userId);
    }
  }.property('user_id')
});

/**
 * Session initializer
 */
export default {
  name: 'customize-session',

  /**
   * Registering the custom session
   * @param container
   */
  initialize: function(container) {
    container.register('session:withCurrentUser', SessionWithCurrentUser);
  }
};
