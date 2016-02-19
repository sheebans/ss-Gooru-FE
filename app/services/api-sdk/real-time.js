import Ember from 'ember';

export default Ember.Service.extend({

  findResourcesByCollection: function(classId, collectionId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('realTimeAdapter').queryRecord({
        classId: classId,
        collectionId: collectionId
      }).then(function(events) {
        resolve(service.get('realTimeSerializer').normalizeResponse(events));
      }, function(error) {
        reject(error);
      });
    });
  }

});
