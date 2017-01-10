import Ember from 'ember';
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

/**
 * Teacher route
 *
 * @module
 * @augments Ember.Route
 */
export default Ember.Route.extend(PrivateRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @type {I18nService} Service to retrieve translations information
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // Actions


  // -------------------------------------------------------------------------
  // Methods

  /**
   * Get model for the controller
   */
  model: function() {
    let route = this;

    const tourSteps = Ember.A([
      {
        elementSelector: '.gru-header .home-link',
        title: route.get('i18n').t('gru-tour.home.stepOne.title'),
        description: route.get('i18n').t('gru-tour.home.stepOne.description')
      },
      {
        elementSelector: '.teacher-navigator .active-classes a',
        title: route.get('i18n').t('gru-tour.home.stepTwo.title'),
        description: route.get('i18n').t('gru-tour.home.stepTwo.description')
      },
      {
        elementSelector: '.teacher-navigator .actions .create-class-cta',
        title: route.get('i18n').t('gru-tour.home.stepFour.title'),
        description: route.get('i18n').t('gru-tour.home.stepFour.description')
      },
      {
        elementSelector: '.gru-header .profile-link .profile',
        title: route.get('i18n').t('gru-tour.home.stepFive.title'),
        description: route.get('i18n').t('gru-tour.home.stepFive.description')
      }
    ]);

    return Ember.RSVP.hash({
      tourSteps:tourSteps
    });
  },

  /**
   * Set all controller properties from the model
   * @param controller
   * @param model
   */

  setupController: function(controller, model) {
    controller.set('steps', model.tourSteps);
  }

});
