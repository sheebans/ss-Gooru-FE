import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import Env from 'gooru-web/config/environment';

export default Ember.Route.extend(PrivateRouteMixin, {
  /**
   * @property {Service} session
   */
  session: Ember.inject.service(),

  /**
   * @property {TenantService}
   */
  tenantService: Ember.inject.service('api-sdk/tenant'),

  /**
   * Authentication (api-sdk/authentication) service.
   * @property {AuthenticationService} authService
   * @readOnly
   */
  authenticationService: Ember.inject.service('api-sdk/authentication'),

  beforeModel: function() {
    this._super(...arguments);
    const router = this;
    router.get('authenticationService').signOut();
    const tenantService = router.get('tenantService');
    const isProd = Env.environment === 'production';
    tenantService.findTenantFromCurrentSession().then(function(response) {
      if (response) {
        let redirectUrl = response.marketingSiteUrl;
        if (isProd && redirectUrl) {
          window.location.replace(redirectUrl);
        }
      } else {
        if (isProd) {
          setTimeout('location.replace(Env.marketingSiteUrl);', 0);
        }
      }
    });
    router.get('session').invalidate();
  }
});
