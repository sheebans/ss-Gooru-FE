import Ember from "ember";
import SessionMixin from "../../mixins/session";
import Env from "../../config/environment";

const ConfigDefaultUser = Env["default-user"] || {};

export default Ember.Service.extend(SessionMixin, {

  /**
   * Creates a session with the "default" user credentials
   * @returns {*|Ember.RSVP.Promise}
   */
  signInWithDefaultUser: function() {
    return this.get("session").authenticate("authenticator:custom", {
      username: ConfigDefaultUser.username,
      password: ConfigDefaultUser.password,
      isDefaultUser: true
    });
  },

  /**
   * Creates a session with the specified user credentials
   * @returns {*|Ember.RSVP.Promise}
   */
  signInWithUser: function(credentials) {
    return this.get("session").authenticate("authenticator:custom", {
      username: credentials.username,
      password: credentials.password,
      isDefaultUser: false
    });
  }

});
