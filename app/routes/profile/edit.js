import Ember from 'ember';

export default Ember.Route.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Methods

  // 
  // Actions
  actions: {
    willTransition(transition) {
      let route = this;
      let model = route.controller.get('profile');
      if (model.get('hasDirtyAttributes')) {
        let confirmation = confirm(route.get('i18n').t('validations.unsavedChanges').string);
        if (confirmation) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    }
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */
  setupController: function(controller, model) {
    controller.set("profile", model.profile);
    controller.get('parentController').selectMenuItem(null);
  }

});
