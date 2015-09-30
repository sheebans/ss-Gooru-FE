import Ember from 'ember';

export default Ember.Component.extend({

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
