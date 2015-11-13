import Ember from "ember";
import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

/**
 * @typedef {object} ApplicationRoute
 */
export default Ember.Route.extend(ApplicationRouteMixin, {

  model: function() {
    var route = this;
    var currentSession = route.get("session.data.authenticated");

    return Ember.RSVP.hash({
      currentSession: currentSession
    });
  },

  actions: {
    /**
     * Action triggered when submitting the login form
     * @see application.hbs
     * @see app-header.hbs
     */
    signIn: function() {
      this.transitionTo("index");
    },

    /**
     * Action triggered when login out
     */
    logout: function() {
      this.get("session").invalidate();
      this.refresh();
    },

    /**
     * Action triggered when the user search for collections
     * @see application.hbs
     * @see app-header.js
     */
    searchTerm: function(term) {
      var termParam = '?term=' + term;
      this.transitionTo('/search/collections' + termParam);
    }
  }

});
