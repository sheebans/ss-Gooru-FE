import Ember from 'ember';
/**
 * @typedef {object} Index Route
 */
export default Ember.Route.extend({

  session: Ember.inject.service(),

  sessionService: Ember.inject.service("api-sdk/session"),

  queryParams: {
    access_token : {}
  },

  model(params) {
    let details = null;
    let accessToken = params.access_token;

    if (accessToken) {
      details = this.get("sessionService").signInWithToken(accessToken);
    }

    return Ember.RSVP.hash({
      details
    });
  },

  afterModel() {
    if (this.get('session.isAnonymous')) {
      this.transitionTo('sign-in');
    } else {
      this.transitionTo('user');
    }
  }

});


