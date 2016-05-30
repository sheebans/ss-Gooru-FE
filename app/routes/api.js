import Ember from 'ember';

export default Ember.Route.extend({

  lookupService: Ember.inject.service('api-sdk/lookup'),


  actions: {
    doRequest: function () {
      //const body = Ember.$("#request-body").val();
      this.get("lookupService").readAudiences()
        .then(function (response) {
          console.debug(response);
        }, function (error) {
          console.debug(error);
        });
      this.get("lookupService").readDepthOfKnowledgeItems()
        .then(function (response) {
          console.debug(response);
        }, function (error) {
          console.debug(error);
        });
      this.get("lookupService").readLicenses()
        .then(function (response) {
          console.debug(response);
        }, function (error) {
          console.debug(error);
        });
    }
  }

});
