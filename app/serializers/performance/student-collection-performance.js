import Ember from 'ember';
import AssessmentResult from 'gooru-web/models/result/assessment';
export default Ember.Object.extend({

  normalizeStudentCollection: function(payload) {
    const serializer = this;
    let collection = payload.collection;
    return AssessmentResult.create({
      sessionId: payload.sessionId,
      score: collection.score,
      resourceId: collection.gooruOId,
      timeSpent: collection.timeSpent,
      views: collection.views,
      resourceResults: serializer.normalizeResourceResults(payload.resources)
    });
  }


});
