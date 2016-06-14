import Ember from 'ember';

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

  authenticationService: Ember.inject.service('api-sdk/authentication'),

  beforeModel() {
    const mixin = this;
    if(mixin.get('session.isAnonymous')) {
      mixin.transitionTo('sign-in');
    } else {
      return mixin.get('authenticationService').checkToken(mixin.get('session.token-api3'))
        .then(function() {
            return Ember.RSVP.resolve(mixin._super(...arguments));
          },
          function() {
            const queryParams = { queryParams: { sessionEnds: 'true' } };
            mixin.transitionTo('sign-in', queryParams);
          });
    }
  }
});
