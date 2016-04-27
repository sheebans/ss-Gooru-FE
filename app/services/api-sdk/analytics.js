import Ember from 'ember';
import PeerAdapter from 'gooru-web/adapters/analytics/peer';

export default Ember.Service.extend({

  peerAdapter: null,


  init: function() {
    this._super(...arguments);
    this.set('peerAdapter', PeerAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  getCoursePeers: function(classId, courseId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('peerAdapter').getCoursePeers(classId, courseId)
        .then(function(response) {
          resolve(response);
        }, function(error) {
          reject(error);
        });
    });
  },

  findResourcesByCollection: function(classId, courseId, unitId, lessonId, collectionId, collectionType) {
    const service = this;
    return new Ember.RSVP.Promise(function (resolve, reject) {
      service.get('analyticsAdapter').queryRecord({
        classId: classId,
        courseId: courseId,
        unitId: unitId,
        lessonId: lessonId,
        collectionId: collectionId,
        collectionType: collectionType
      }).then(function(events) {
        resolve(service.get('analyticsSerializer').normalizeResponse(events));
      }, function(error) {
        reject(error);
      });
    });
  }

});
