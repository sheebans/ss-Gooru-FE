import Ember from 'ember';

/**
 * TODO may need to add this mixin to all the public routes
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
    return mixin.get('authenticationService').checkToken(mixin.get('session.token-api3'))
      .then(function() {
        return Ember.RSVP.resolve(mixin._super(...arguments));
      },
      function() {
        return mixin.get('session').authenticateAsAnonymous();
      });
  }
});
