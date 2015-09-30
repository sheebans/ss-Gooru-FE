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

  didInsertElement: function() {
    var component = this;
    component.$('#username').tooltip({title:component.get('i18n').t('signUp.usernameToolTip'), placement: "left"});
    component.$('#firstName').tooltip({title:component.get('i18n').t('signUp.nameToolTip'), placement: "left"});
    component.$('#lastName').tooltip({title:component.get('i18n').t('signUp.nameToolTip'), placement: "left"});
    component.$('#email').tooltip({title:component.get('i18n').t('signUp.emailToolTip'), placement: "left"});
    component.$('#password').tooltip({title:component.get('i18n').t('signUp.passwordToolTip'), placement: "left"});
    component.$('#re-password').tooltip({title:component.get('i18n').t('signUp.passwordToolTip'), placement: "left"});
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
    }
  }

});
