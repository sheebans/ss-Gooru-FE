import Ember from 'ember';

/**
 * Radio Button component for Roles
 * @see role-radio-button.hbs
 *
 *
 * @module
 * @typedef {object} RoleRadioButton
 */
export default Ember.Component.extend({

  /**
   * @property {string} on check role option action
   */
  onCheckRoleOptionAction: "onCheckRoleOption",

  actions: {
    checkRoleOption: function(optionValue) {
      this.sendAction("onCheckRoleOptionAction", optionValue);
    }
  }

});
