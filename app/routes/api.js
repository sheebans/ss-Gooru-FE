import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  lookupService: Ember.inject.service('api-sdk/lookup'),


  actions: {
    doRequest: function (){
      const body = Ember.$("#request-body").val();
      this.get("lookupService").readCountries(body).then(function(countries){
        console.debug(countries);
      });
    }
  }

});
