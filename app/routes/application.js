import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

  model: function() {
    return this.store.createRecord('sign-up');
  },

  actions: {
    /**
     * Action triggered when submitting the login form
     * @see application.hbs and app-header.hbs
     */
    onAuthenticate: function() {
      this.transitionTo('index');
    },

    /**
     * Action triggered when login out
     */
    invalidateSession: function() {
      this.get('session').invalidate();
    },

    signUp: function() {
      var self = this;
      this.controller.get('model').save().then(
        function() {
          self.transitionTo('index');
        });
    },

    /**
     * Action triggered when birthday is selected in the sign-up form
     * @see app-header.hbs and sign-up-form.hbs and role-radio-button.hbs
     */
    onSelectDateOfBirth: function(dateValue) {
      var model = this.controller.get('model');
      model.set('dateOfBirth', dateValue);
    },

    /**
     * Action triggered when role is selected in the sign-up form
     * @see app-header.hbs and sign-up-form.hbs and role-radio-button.hbs
     */
    onCheckRoleOption: function(optionValue) {
      var model = this.controller.get('model');
      model.set('role', optionValue);
    }
  }
});
