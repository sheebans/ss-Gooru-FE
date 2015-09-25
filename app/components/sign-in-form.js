import Ember from 'ember';

const { service } = Ember.inject;

export default Ember.Component.extend({

  session: service('session'),

  actions: {
    authenticate: function() {
      var self = this;
      var credentials = this.getProperties('username', 'password');
      this.get('session').authenticate('authenticator:custom', credentials)
        .then(function() {
          self.sendAction('onAuthenticate');
        })
        .catch((reason) => {
          this.set('errorMessage', reason.error);
        });
    }
  }

});
