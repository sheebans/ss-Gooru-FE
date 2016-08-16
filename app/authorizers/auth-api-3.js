import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';
import { TOKEN_EXPIRATION_TIME } from 'gooru-web/config/config';


// TODO use this instead of defineHeaders in all the adapters that need this Authorization header
export default BaseAuthorizer.extend({

  authenticationService: Ember.inject.service('api-sdk/authentication'),
  session: Ember.inject.service(),
  sessionService: Ember.inject.service("api-sdk/session"),

  authorize(data, block) {
    const authorizer = this;
    const token  = data['token-api3'];
    var session = authorizer.get('session');
    var now = Date.now();
    var time = now - session.get('userData.providedAt');
    if(time < TOKEN_EXPIRATION_TIME) {
      block(null, 'Authorization', `Token ${token}`);
    } else {
      return authorizer.get('authenticationService').checkToken(token).then(function () {
        session.set('userData.providedAt', now);
        authorizer.get('sessionService').updateUserData(session.get('userData'));
        block(null, 'Authorization', `Token ${token}`);
      }, function () {
        return authorizer.get('session').authenticateAsAnonymous().then(
          function () {
            let newToken = authorizer.get('session.token-api3');
            block(null, 'Authorization', `Token ${newToken}`);
          }
        ).catch(block);
      });
    }
  }
});
