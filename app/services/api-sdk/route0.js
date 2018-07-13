import Ember from 'ember';
import Route0Serializer from 'gooru-web/serializers/route0';
import Route0Adapter from 'gooru-web/adapters/route0';

export default Ember.Service.extend({
  session: Ember.inject.service(),

  store: Ember.inject.service(),

  route0Serializer: null,

  route0Adapter: null,

  init: function() {
    this._super(...arguments);
    this.set(
      'route0Serializer',
      Route0Serializer.create(Ember.getOwner(this).ownerInjection())
    );
    this.set(
      'route0Adapter',
      Route0Adapter.create(Ember.getOwner(this).ownerInjection())
    );
  },

  fetchInClass: function(filter) {
    const service = this;
    var responseMockData = {
      status: 'pending', //'accepted' , 'regected', 'na'
      route0Content: {},
      userCompetencyRoute: {}
    };
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (filter) {
        resolve(responseMockData);
        //return responseMockData;
      }
      let serializedFilterData = service
        .get('route0Serializer')
        .fetchInClass(filter);
      service
        .get('route0Adapter')
        .createAssessment({
          body: serializedFilterData
        })
        .then(
          function(responseData) {
            resolve(responseData);
          },
          function(error) {
            reject(error);
          }
        );
    });
  }
});
