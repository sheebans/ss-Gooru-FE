import Ember from 'ember';
import User from 'gooru-web/models/profile/profile';

export default Ember.Controller.extend({

  // -------------------------------------------------------------------------
  // Dependencies


  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  // Actions

  actions: {

    //authenticate: function() {

    //}
  },

  init() {
    this._super(...arguments);
    var user = User.create(Ember.getOwner(this).ownerInjection(), {username: null, password: null});
    var birthDays = [];
    var birthYears = [];

    var currentTime = new Date();

    // returns the current year (four digits)
    var year = currentTime.getFullYear();

    for (let d = 1; d <= 31; d++) {
      birthDays.push(d);
    }

    for (let y = 1900; y <= year; y++) {
      birthYears.push(y);
    }

    this.set('user', user);
    this.set('birthDays', birthDays);
    this.set('birthYears', birthYears);

  },

  /**
   * willDestroyElement event
   */
  willDestroyElement: function(){
    this.set('birthDays', null);
    this.set('birthYears', null);
  },


  // -------------------------------------------------------------------------
  // Properties


});
