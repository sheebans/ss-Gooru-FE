import Ember from 'ember';

export default Ember.Service.extend({

  authenticateAsAnonymous: function() {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('authenticationAdapter').postAuthentication({
        isAnonymous: true
      }).then(function(response) {
          resolve(service.get('authenticationSerializer').normalizeResponse(response, true));
        }, function(error) {
          reject(error);
        });
    });
  },

  authenticateWithCredentials: function(username, password) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('authenticationAdapter').postAuthentication({
        isAnonymous: false,
        username: username,
        password: password
      }).then(function(response) {
          resolve(service.get('authenticationSerializer').normalizeResponse(response, false));
        }, function(error) {
          reject(error);
        });
    });
  }

});
