import Ember from 'ember';
import PublicRouteMixin from "gooru-web/mixins/public-route-mixin";

/**
 * @typedef {object} Index Route
 */
export default Ember.Route.extend(PublicRouteMixin, {

  session: Ember.inject.service(),

  sessionService: Ember.inject.service("api-sdk/session"),

  queryParams: {
    access_token : {}
  },

  model(params) {
    let details = null;
    let accessToken = params.access_token;

    if (accessToken) { // this is for google sign in
      details = this.get("sessionService").signInWithToken(accessToken);
    }

    return Ember.RSVP.hash({
      details
    });
  },

  afterModel() {
    const anonymous = this.get('session.isAnonymous');
    if (!anonymous) {
      if (this.get('session.userData.isNew')) {
        this.transitionTo('sign-up-finish');
      } else {
        this.transitionTo('home');
      }
    }
  }

});


