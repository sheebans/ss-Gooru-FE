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

      component.get("sessionService")
        .signInWithUser(component.get("credentials"))
        .then(function() {
          // Close the modal
          component.triggerAction({
            action: 'closeModal'
          });
          // Trigger action in parent
          component.triggerAction({
            action: 'signIn',
            target: component.get('target')
          });
        })
        .catch((reason) => {
          component.set("errorMessage", reason.error);
        });
    }

  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * Specific component class(es). Multiple classes are separated with spaces.
   * @type {?String}
   */
  'component-class':null,

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
