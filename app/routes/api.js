import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),


  actions: {
    doRequest: function (){
      const body = Ember.$("#request-body").val();
      this.get("lookupService").readDistricts('27a84e40-d478-11e4-bfe7-22000abfab1d', body).then(function(states){
        console.debug(states);
      });
    }
  }

});
