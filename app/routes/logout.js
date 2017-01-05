import Ember from "ember";
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";
import Env from 'gooru-web/config/environment';

export default Ember.Route.extend(PrivateRouteMixin, {

  /**
   * @property {Service} session
   */
  session: Ember.inject.service(),

  firebaseApp: Ember.inject.service(),


  beforeModel: function() {
    this._super(...arguments);
    this.get("session").invalidate();
    const auth = this.get('firebaseApp').auth();
    auth.signOut().then(function() {
      // Sign-out successful.
      //console.log('User has been signed out');
    }, function(error) {
      // An error happened.
      //console.log('Error logging user out',error);
    });
    const isProd = Env.environment === 'production';
    if (isProd) {
      window.location = Env.marketingSiteUrl; //this is not an ember route, see nginx.conf
      return true;
    }
  }

});
