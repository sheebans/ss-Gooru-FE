import Ember from 'ember';


export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies

  parentController: Ember.inject.controller('profile/content'),

  profileService: Ember.inject.service("api-sdk/profile"),

  // -------------------------------------------------------------------------
  // Properties
  courses:'asdf'



});
