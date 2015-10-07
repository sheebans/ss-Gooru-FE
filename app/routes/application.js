import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Ember.Route.extend(ApplicationRouteMixin, {

  sessionService: Ember.inject.service("api-sdk/session"),

  model: function() {
    var route = this;
    var currentSession = null;

    if (route.get("session.isAuthenticated")) {
      currentSession = route.get("session.data.authenticated");
    } else {
      route.get("sessionService").signInWithDefaultUser()
        .then(function () {
          currentSession = route.get("session.data.authenticated");
        })
    }

    return Ember.RSVP.hash({
      currentSession: currentSession
    });
  },

  actions: {
    /**
     * Action triggered when submitting the login form
     * @see application.hbs and app-header.hbs
     */
    onAuthenticate: function() {
      this.transitionTo("index");
    },

    /**
     * Action triggered when login out
     */
    onInvalidateSession: function() {
      this.get("session").invalidate();
      this.refresh();
    },

    /**
     * Action triggered when close modal
     */
    onCloseModal: function() {
      this.refresh();
    }

  }
});
