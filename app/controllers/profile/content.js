import Ember from 'ember';
import ModalMixin from 'gooru-web/mixins/modal';

export default Ember.Controller.extend(ModalMixin, {

  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile')

});
