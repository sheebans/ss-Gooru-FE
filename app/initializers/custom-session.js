// @TODO This implementation is still on development

import Ember from "ember";
import Session from "ember-simple-auth/internal-session";

/**
 * Custom session
 * @typedef {Object} CustomizeSession
 */
var SessionWithCurrentUser = Session.extend({

  /**
   * Returns the current user if available
   * @return {*} user
   */
  currentUser: function() {
    var userId = this.get('token');
    if (!Ember.isEmpty(userId)) {
      this.set('currentUser', userId);
      // @TODO We need to figure out why this is not working as expected
      //return this.container.lookup('store:main').find('user', userId);
    }
  }.property('token')
});

/**
 * Session initializer
 *
 * @module
 * @typedef {Object} SessionInitializer
 */
export default {
  //name: 'customize-session',
  name: "current-user",
  after: "ember-simple-auth",

  /**
   * Registering the custom session
   * @param container
   */
  initialize: function (container) {
    container.register('session:withCurrentUser', SessionWithCurrentUser);

    // @TODO We need to figure out why this is not working as expected
    /*
    Session.reopen({
      setCurrentUser: function() {
        console.log("Setting Current User...");
        var token = this.get('token');
        var self = this;

        if (!Ember.isEmpty(token)) {
          self.set('currentUser', this.get('user'));
        }

        //var user = this.get('user');
        //if (!Ember.isEmpty(user)) {
        //  var session = this.container.lookup('session:main');
        //  return session.user;
        //}
      }.property("token")
    });
    */

  }
};
