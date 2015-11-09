import Ember from "ember";
import ModalMixin from '../mixins/modal';



/**
 * User sign up
 *
 * Component that retrieves a user's information for signing up into the system.
 * May be embedded into a modal window (@see gru-modal).
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend(ModalMixin,{

  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @property {Service} User service API SDK
   */
  userService: Ember.inject.service("api-sdk/user"),

  // -------------------------------------------------------------------------
  // Attributes

  classNames:['gru-user-sign-up'],

  classNameBindings: ['component-class'],

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    /**
     * Sign up user
     */
    signUp: function() {
      this.get('user').validate().then(function(value){
          console.log(value);
        },function(err){
          console.log(err);
      }

      );
      this.get("userService")
        .create(this.get('user'))
        .then(function() {
          this.triggerAction({
            action: 'closeModal'
          });
        }.bind(this),
        function() {
          Ember.Logger.error('Error signing up user');
        }
      );
    },

    /**
     * Update user birth date
     * @param {String} dateValue - birth date as a string
     */
    setBirthDate: function(dateValue) {
      this.set("user.dateOfBirth", dateValue);
    },

    /**
     * Update user role
     * @param {String} role
     * @example
     * "teacher", "student", "parent"
     */
    setRoleValue: function(role) {
      this.set("user.role", role);
    }
  },

  // -------------------------------------------------------------------------
  // Events

  didInsertElement: function() {
    var component = this;
    component.$("[data-toggle='tooltip']").tooltip({trigger: "hover"});
  },

  // -------------------------------------------------------------------------
  // Properties

  /**
   * @type {?String} specific class
   */
  'component-class':null,

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null,

  /**
   * User
   * @property {Ember.Model}
   */
  model: []

});
