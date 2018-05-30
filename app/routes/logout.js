import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';
import Env from 'gooru-web/config/environment';
import EndPointsConfig from 'gooru-web/utils/endpoint-config';

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

  defaultMarketingSiteUrl: Ember.computed(function() {
    return `${
      window.location.protocol
    }//${window.location.host}${Env.marketingSiteUrl}`;
  }),

  beforeModel: function() {
    this._super(...arguments);
    const router = this;
    router
      .get('authenticationService')
      .signOut()
      .then(() => {
        const isProd = Env.environment === 'production';
        let redirectUrl = null;
        redirectUrl = EndPointsConfig.getMarketingsiteURL();
        if (isProd && redirectUrl) {
          router.get('session').invalidate();
          window.location.replace(redirectUrl);
        } else {
          router.get('session').invalidate();
        }
      });
  }
});
