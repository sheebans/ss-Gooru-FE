import Ember from 'ember';

export default Ember.Component.extend({

  i18n: Ember.inject.service(),

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

  username: null,
  firstName: null,
  lastName: null,
  email: null,
  password: null,
  confirmedPassword: null,


  didInsertElement: function() {
    var component = this;
    component.$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  },

  actions: {
    signUp: function() {
      var self = this;
      this.get('model').save()
        .then(function() {
          //self.transitionTo('index');
          if (self.get("onSuccessAction")){
            self.sendAction('onSuccessAction');
          }
        });
    },

    onSelectDateOfBirthAction: function(dateValue) {
      this.sendAction("onSelectDateOfBirthAction", dateValue);
    },

    onCheckRoleOptionAction: function(optionValue) {
      this.sendAction("onCheckRoleOptionAction", optionValue);
    },

    usernameDidChange: function(value) {
      console.log(value);
    },

    firstNameDidChange: function(value) {
      console.log(value);
    },

    lastNameDidChange: function(value) {
      console.log(value);
    },

    emailDidChange: function(value) {
      console.log(value);
    },

    passwordDidChange: function(value) {
      console.log(value);
    },

    rePasswordDidChange: function(value) {
      console.log(value);
    }
  }

});
