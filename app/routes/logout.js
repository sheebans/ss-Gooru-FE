import Ember from "ember";
import PrivateRouteMixin from "gooru-web/mixins/private-route-mixin";

export default Ember.Route.extend(PrivateRouteMixin, {

  /**
   * @property {Service} session
   */
  session: Ember.inject.service(),


  beforeModel: function() {
    this._super(...arguments);
    this.get("session").invalidate();
  }

});
