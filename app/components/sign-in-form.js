import Ember from "ember";
import ModalMixin from '../mixins/modal';

export default Ember.Component.extend(ModalMixin,{

  classNames:['gru-sign-in-form'],

  classNameBindings: ['component-class'],

  /**
   * @property {SessionService} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

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

  /**
   * Data-biding properties for the form fields
   */
  username: null,
  password: null,

  actions: {
    authenticate: function() {
      var component = this;
      var credentials = component.getProperties("username", "password");
      this.get("sessionService").signInWithUser(credentials)
        .then(function() {
          component.sendAction("onAuthenticateAction");
          if (component.get("onSuccessAction")) {
            component.sendAction("onSuccessAction");
          }
        })
        .catch((reason) => {
          this.set("errorMessage", reason.error);
          if (component.get("onFailureAction")) {
            component.sendAction("onFailureAction");
          }
        });
    }
  }

});
