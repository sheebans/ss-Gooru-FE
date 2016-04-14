import Ember from 'ember';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  classService: Ember.inject.service('api-sdk/class'),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  // -------------------------------------------------------------------------
  // actions

  actions: {
    /**
     * Join class event
     * @param {string} code
     */
    joinClass: function(code){
      const controller = this;
      controller.get("classService")
        .joinClass(code).then(function(){
        controller.transitionToRoute('user');
          //TODO redirect to class
        }, function (error){
          let message = controller.get('i18n').t('common.errors.can-not-join-class').string;
          if (error.code === 'restricted'){
            message = controller.get('i18n').t('content.classes.join.join-not-allowed').string;
          }
          else if(error.code === 'not-found'){
            message = controller.get('i18n').t('content.classes.join.class-not-found').string;
          }
          controller.get('notifications').error(message);
        });

    }
  }

});
