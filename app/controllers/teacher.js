import Ember from 'ember';

export default Ember.Controller.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  applicationController: Ember.inject.controller('application'),

  // -------------------------------------------------------------------------
  // Actions



  // -------------------------------------------------------------------------
  // Properties

  /**
   * @property {Profile}
   */
  profile: Ember.computed.alias('applicationController.profile')
});
