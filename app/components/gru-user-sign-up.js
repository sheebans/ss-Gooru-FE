import Ember from "ember";


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
   * @property {string} on success action to be sent to the parent component
   */
  onSuccessAction: null,

  /**
   * @property {string} on select date of birth action
   */
  onSelectDateOfBirthAction: "onSelectDateOfBirth",

  /**
   * @property {string} on check role option action
   */
  onCheckRoleOptionAction: "onCheckRoleOption",

  /**
   * Data-biding properties for the form fields
   */
  username: null,
  firstName: null,
  lastName: null,
  email: null,
  dateOfBirth: null,
  role: null,
  password: null,
  confirmedPassword: null,


  didInsertElement: function() {
    var component = this;
    component.$("[data-toggle='tooltip']").tooltip({trigger: "hover"});
  },

  actions: {
    signUp: function() {
      var component = this;
      this.get("userService").create({
          username: component.get("username"),
          firstName: component.get("firstName"),
          lastName: component.get("lastName"),
          email: component.get("email"),
          dateOfBirth: component.get("dateOfBirth"),
          role: component.get("role"),
          password: component.get("password")
        })
        .then(function() {
          if (component.get("onSuccessAction")) {
            component.sendAction("onSuccessAction");
          }
        });
    },

    /**
     * Action triggered when birthday is selected in the sign-up form
     */
    onSelectDateOfBirthAction: function(dateValue) {
      this.set("dateOfBirth", dateValue);
    },

    /**
     * Action triggered when role is selected in the sign-up form
     */
    onCheckRoleOptionAction: function(optionValue) {
      this.set("role", optionValue);
    }
  }

});
