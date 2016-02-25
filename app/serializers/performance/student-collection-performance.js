import AssessmentResult from 'gooru-web/models/result/assessment';
import QuestionResult from 'gooru-web/models/result/question';
import ResourceResult from 'gooru-web/models/result/resource';

export default Ember.Object.extend({

  normalizeRealTimeEvent: function(payload) {
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
