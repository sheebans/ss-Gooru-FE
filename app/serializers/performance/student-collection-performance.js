import Ember from 'ember';
import AssessmentResult from 'gooru-web/models/result/assessment';
export default Ember.Object.extend({

  normalizeStudentCollection: function(payload) {
    const serializer = this;
    const found = payload && payload.content && payload.content.length;

    if (found){
      let content = payload.content[0];
      let collection = content.collection;
      return AssessmentResult.create({
        sessionId: payload.sessionId,
        score: collection.score,
        resourceId: collection.gooruOId,
        timeSpent: collection.timeSpent,
        views: collection.views,
        resourceResults: serializer.normalizeResourceResults(content.resources)
      });
    }

    return null;
  }


});
