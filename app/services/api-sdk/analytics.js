import Ember from 'ember';
import PeerAdapter from 'gooru-web/adapters/analytics/peer';
import PeerSerializer from 'gooru-web/serializers/analytics/peer';
import CurrentLocationAdapter from 'gooru-web/adapters/analytics/current-location';
import CurrentLocationSerializer from 'gooru-web/serializers/analytics/current-location';

export default Ember.Service.extend({

  peerAdapter: null,

  peerSerializer: null,

  currentLocationAdapter: null,

  currentLocationSerializer: null,

  courseService: Ember.inject.service("api-sdk/course"),

  unitService: Ember.inject.service("api-sdk/unit"),

  lessonService: Ember.inject.service("api-sdk/lesson"),

  collectionService: Ember.inject.service("api-sdk/collection"),

  assessmentService: Ember.inject.service("api-sdk/collection"),

  init: function() {
    this._super(...arguments);
    this.set('peerAdapter', PeerAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('peerSerializer', PeerSerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('currentLocationAdapter', CurrentLocationAdapter.create(Ember.getOwner(this).ownerInjection()));
    this.set('currentLocationSerializer', CurrentLocationSerializer.create(Ember.getOwner(this).ownerInjection()));
  },

  getCoursePeers: function(classId, courseId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('peerAdapter').getCoursePeers(classId, courseId)
        .then(function(response) {
          resolve(service.get('peerSerializer').normalizePeers(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  getUnitPeers: function(classId, courseId, unitId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('peerAdapter').getUnitPeers(classId, courseId, unitId)
        .then(function(response) {
          resolve(service.get('peerSerializer').normalizePeers(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  getLessonPeers: function(classId, courseId, unitId, lessonId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('peerAdapter').getLessonPeers(classId, courseId, unitId, lessonId)
        .then(function(response) {
          resolve(service.get('peerSerializer').normalizePeers(response));
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
  },

  getUserCurrentLocation: function(classId, userId, fetchAll = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('currentLocationAdapter').getUserCurrentLocation(classId, userId)
        .then(function(response) {
          const currentLocation = service.get('currentLocationSerializer').normalizeCurrentLocation(response);

          if(fetchAll && currentLocation){
            const courseId = currentLocation.get("courseId");
            const unitId = currentLocation.get("unitId");
            const lessonId = currentLocation.get("lessonId");
            const collectionId = currentLocation.get("collectionId");
            const collectionType = currentLocation.get("collectionType");

            let collection = undefined;
            if(collectionId){
              if(collectionType === "collection"){
                collection = service.get('collectionService').readCollection(collectionId);
              }
              else{
                collection = service.get('assessmentService').readAssessment(collectionId);
              }
            }


            Ember.RSVP.hash({
              course: courseId ? service.get('courseService').fetchById(courseId) : undefined,
              unit: unitId ? service.get('unitService').fetchById(courseId, unitId) : undefined,
              lesson: lessonId ? service.get('lessonService').fetchById(courseId, unitId, lessonId) : undefined,
              collection: collection
            }).then(function (hash) {
              currentLocation.set("course", hash.course);
              currentLocation.set("unit", hash.unit);
              currentLocation.set("lesson", hash.lesson);
              currentLocation.set("collection", hash.collection);
              resolve(currentLocation);
            });

          }else{
            resolve(currentLocation);
          }

        }, function(error) {
          reject(error);
        });
    });
  },

  getStandardsSummary: function(sessionId, userId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('analyticsAdapter').getStandardsSummary(sessionId, userId)
        .then(function(response) {
          resolve(service.get('analyticsSerializer').normalizeGetStandardsSummary(response));
        }, function(error) {
          reject(error);
        });
    });
  }

});
