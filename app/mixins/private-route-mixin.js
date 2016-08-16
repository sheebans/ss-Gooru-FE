import Ember from 'ember';
import { TOKEN_EXPIRATION_TIME } from 'gooru-web/config/config';

/**
 * TODO add this mixin to all the private routes
 * __This mixin is used to make routes accessible even if the session is
 * not authenticated__ It defines a
 * `beforeModel` method that checks if the token is still valid
 */
export default Ember.Mixin.create({
  /**
   * The session service.
   * @property session
   * @readOnly
   */
  session: Ember.inject.service('session'),

  /**
   * @property {Ember.Service} Authentication service
   */
  authenticationService: Ember.inject.service('api-sdk/authentication'),

  /**
   * @property {Ember.Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

  beforeModel() {
    const mixin = this;
    if(mixin.get('session.isAnonymous')) {
      return mixin.transitionTo('sign-in');
    }
    var session = mixin.get('session');
    var now = Date.now();
    var time = now - session.get('userData.providedAt');
    if(time < TOKEN_EXPIRATION_TIME) {
      return Ember.RSVP.resolve(mixin._super(...arguments));
    }
    return mixin.get('authenticationService').checkToken(mixin.get('session.token-api3'))
      .then(function() {
        session.set('userData.providedAt', now);
        return mixin.get('sessionService').updateUserData(session.get('userData'));
      },
      function() {
        const queryParams = { queryParams: { sessionEnds: 'true' } };
        mixin.transitionTo('sign-in', queryParams);
      });
  }
});
