import Ember from 'ember';

export default Ember.Service.extend({

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
