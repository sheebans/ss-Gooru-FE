import Ember from 'ember';
import SuggestAdapter from 'gooru-web/adapters/suggest/suggest';

export default Ember.Service.extend({

  suggestAdapter: null,


  init: function () {
    this._super(...arguments);
    this.set('suggestAdapter', SuggestAdapter.create(Ember.getOwner(this).ownerInjection()));
  },


  suggestResources: function(term, params) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('suggestAdapter').suggestResources(term, params)
        .then(function(response) {
          resolve(response);
        }, reject);
    });
  }

});
