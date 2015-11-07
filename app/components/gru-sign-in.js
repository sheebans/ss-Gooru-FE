import Ember from "ember";
import ModalMixin from '../mixins/modal';

export default Ember.Component.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-sign-in'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    authenticate: function() {
      var component = this;
      this.get("sessionService")
        .signInWithUser(this.get("credentials"))
        .then(function() {
          // Close the modal
          this.triggerAction({
            action: 'closeModal'
          });
          // Trigger action in parent
          this.triggerAction({
            action: 'signIn',
            target: this.get('target')
          });
        }.bind(this))
        .catch((reason) => {
          this.set("errorMessage", reason.error);
        });
    }

  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {string} authentication error message
   */
  errorMessage: null,

  /**
   * Object with credentials for signing in
   *
   * @type {Ember.Object}
   */
  credentials: Ember.Object.create({
    username: null,
    password: null
  }),

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null


});
