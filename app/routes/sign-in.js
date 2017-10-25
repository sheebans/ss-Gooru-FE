import Ember from 'ember';
import PublicRouteMixin from 'gooru-web/mixins/public-route-mixin';

export default Ember.Route.extend(PublicRouteMixin, {
  // -------------------------------------------------------------------------
  // Dependencies

  /**
   * @requires service:notifications
   */
  notifications: Ember.inject.service(),

  /**
   * @requires service:authentication
   */
  authenticationService: Ember.inject.service('api-sdk/authentication'),

  // -------------------------------------------------------------------------
  // Methods

  /**
   * Set all controller properties used in the template
   * @param controller
   * @param model
   */
  setupController: function(controller) {
    // remove old notifications
    this.get('notifications').remove();
    controller.resetProperties();
  },

  /**
   * Verfiy the domain have any directions before model get execute.
   */
  beforeModel: function() {
    let domain = window.location.hostname;
    this.get('authenticationService')
      .domainBasedRedirection(domain)
      .then(function(data) {
        if (data) {
          if (data.statusCode === 303) {
            window.location.href = data.redirectUrl;
          }
        }
      });
  }
});
