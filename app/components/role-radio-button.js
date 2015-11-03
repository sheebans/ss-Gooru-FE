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
   * @property {Function} action handler to call when a role option is selected
   */
  onCheck: null,

  actions: {

    checkRoleOption: function(optionValue) {
      var handler = this.get('onCheck');
      if (handler && typeof handler == 'function') {
        handler(optionValue);
      }
    }

  }

});
