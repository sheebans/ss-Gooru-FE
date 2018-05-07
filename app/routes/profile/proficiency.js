import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    classId: {
      refreshModel: true
    }
  },

  beforeModel(transition) {
    let route = this;
    let userId = transition.params
      ? transition.params.profile.userId || null
      : null;
    route.set('userId', userId);
  },

  model(params) {
    let route = this;
    return {
      userId: route.get('userId'),
      classId: params.classId
    };
  },

  setupController(controller, model) {
    controller.set('userId', model.userId);
    controller.set('classId', model.classId);
  }
});
