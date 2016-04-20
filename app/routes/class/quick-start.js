import Ember from 'ember';

export default Ember.Route.extend({

  setupController: function (controller, model) {
    controller.get('classController').selectMenuItem('overview');
    controller.set('class', model.class);
  }
});
