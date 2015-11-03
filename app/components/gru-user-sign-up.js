import Ember from "ember";

/**
 * @const
 * @type {string[]}
 */
const steps = ['intro', 'form', 'leave'];

/**
 * User sign up
 *
 * Component that retrieves a user's information for signing up into the system.
 * May be embedded into a modal window (@see gru-modal).
 *
 * @module
 * @augments ember/Component
 */
export default Ember.Component.extend({

  classNames:['gru-user-sign-up'],

  classNameBindings: ['component-class'],

  /**
   * @type {?String} specific class
   */
  'component-class':null,

  /**
   * @property {Service} User service API SDK
   */
  userService: Ember.inject.service("api-sdk/user"),

  /**
   * Class handling the actions from the component.
   * This value will be set on instantiation by gru-modal.
   *
   * @type {Ember.Component}
   * @private
   */
  target: null,

  /**
   * User object with all attributes for sign-up
   *
   * @type {Ember.Object}
   */
  user: Ember.Object.create({
    username: null,
    firstName: null,
    lastName: null,
    email: null,
    dateOfBirth: null,
    role: null,
    password: null,
    confirmedPassword: null
  }),

  didInsertElement: function() {
    var component = this;
    component.$("[data-toggle='tooltip']").tooltip({trigger: "hover"});
  },

  actions: {

    /**
     * Sign up user
     */
    signUp: function() {
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
  }

});
