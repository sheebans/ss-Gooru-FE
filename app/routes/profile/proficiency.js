import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

export default Ember.Route.extend(PrivateRouteMixin, {
  beforeModel(transition) {
    let route = this;
    let userId = transition.params
      ? transition.params.profile.userId || null
      : null;
    route.set('userId', userId);
  },

  model() {
    let route = this;
    return {
      userId: route.get('userId')
    };
  },

  setupController(controller, model) {
    controller.set('userId', model.userId);
  }
});
