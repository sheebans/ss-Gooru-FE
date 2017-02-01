import Ember from "ember";
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import Env from 'gooru-web/config/environment';

export default Ember.Route.extend(PrivateRouteMixin, {

  /**
   * @property {Service} session
   */
  session: Ember.inject.service(),

  firebase: Ember.inject.service('firebase'),


  beforeModel: function() {
    this._super(...arguments);
    this.get("session").invalidate();
    //Signing the user out of firebase
    this.get('firebase').signOut();
    const isProd = Env.environment === 'production';
    if (isProd) {
      window.location = Env.marketingSiteUrl; //this is not an ember route, see nginx.conf
      return true;
    }
  }
});
