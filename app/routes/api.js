import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * @type {ProfileService} Service to retrieve profile information
   */
  classService: Ember.inject.service('api-sdk/class'),


  actions: {
    doRequest: function () {
      const body = Ember.$("#request-body").val();
      this.get("classService").joinClass(body)
        .then(function (joined) {
          console.debug(joined);
        }, function (error) {
          console.debug(error);
        });
    }
  }

});
