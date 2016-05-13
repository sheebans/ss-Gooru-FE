import Ember from 'ember';
//import User from 'gooru-web/models/forgot-password';
//import Env from 'gooru-web/config/environment';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies
  /**
   * @property {Service} Session service
   */
  sessionService: Ember.inject.service("api-sdk/session"),

  /**
   * @property {Service} Notifications service
   */
  notifications: Ember.inject.service(),

  /**
   * @property {Service} I18N service
   */
  i18n: Ember.inject.service(),

  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {


  },

  init(){

  }


  // -------------------------------------------------------------------------
  // Properties



});
