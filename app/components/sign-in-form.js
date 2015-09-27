import Ember from 'ember';
import SessionMixin from '../mixins/session';

export default Ember.Component.extend(SessionMixin, {

  /**
   * @property {string} authentication error message
   */
  errorMessage: null,

  /**
   * @property {string} on authenticate action to be sent to the parent component
   */
  onAuthenticateAction: "onAuthenticate",

  /**
   * @property {string} on success action to be sent to the parent component
   */
  onSuccessAction: null,

  /**
   * @property {string} on failure action to be sent to the parent component
   */
  onFailureAction: null,

  actions: {
    authenticate: function() {
      var self = this;
      var credentials = this.getProperties('username', 'password');
      this.get('session').authenticate('authenticator:custom', credentials)
        .then(function() {
          self.sendAction('onAuthenticateAction');
          if (self.get("onSuccessAction")){
            self.sendAction('onSuccessAction');
          }

        })
        .catch((reason) => {
          this.set('errorMessage', reason.error);
          if (self.get("onFailureAction")){
            self.sendAction('onFailureAction');
          }

        });
    }
  }

});
