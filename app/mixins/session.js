import Ember from "ember";

const { service } = Ember.inject;

/**
 * @typedef {Object} SessionMixin
 */
export default Ember.Mixin.create({

  /**
   * @property {CustomizeSession} custom user session
   */
  session: service("session"),

  /**
   * @property {string} Current Session Token
   */
  sessionToken: Ember.computed("session.data.authenticated", function() {
    return this.get("session.data.authenticated")["token"];
  }),

  /**
   * @property {string} Current Session User Id
   */
  sessionUserId: Ember.computed("session.data.authenticated", function() {
    return this.get("session.data.authenticated.user")["gooruUId"];
  }),

  /**
   * Indicates if the user is authenticated
   * @property {boolean}
   */
  isAuthenticated: Ember.computed.bool("session.isAuthenticated"),

  /**
   * Indicates if the user is Anonymous
   * @property {boolean}
   */
  isAnonymous:  Ember.computed("session.data.authenticated", function() {
    return this.get("session.data.authenticated")["isDefaultUser"];
  })

});
