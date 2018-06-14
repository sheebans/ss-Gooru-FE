import Ember from 'ember';
import PrivateRouteMixin from 'gooru-web/mixins/private-route-mixin';

export default Ember.Route.extend(PrivateRouteMixin, {
  setupController(controller) {
    controller.set('userId', controller.get('parentController.profile.id'));
    //Make the proficiency tab get selected
    controller.get('parentController').selectMenuItem('proficiency');
  }
});
