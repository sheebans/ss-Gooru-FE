import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';


// TODO use this instead of defineHeaders in all the adapters
export default BaseAuthorizer.extend({

  authenticationService: Ember.inject.service('api-sdk/authentication'),
  session: Ember.inject.service(),

  authorize(data, block) {
    const authorizer = this;
    const token  = data['token-api3'];
    return authorizer.get('authenticationService').checkToken(token).then(function(){
      block(null, 'Authorization', `Token ${token}`);
    }, function(){
      return authorizer.get('session').authenticateAsAnonymous().then(
        function() {
          let newToken = authorizer.get('session.token-api3');
          block(null, 'Authorization', `Token ${newToken}`);
        }
      );
    }).catch(block);

  }
});
