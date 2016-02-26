import AssessmentResult from 'gooru-web/models/result/assessment';
import AnalyticsSerializer from '../analytics/analytics';
import { toLocal } from 'gooru-web/utils/utils';

export default AnalyticsSerializer.extend({

  normalizeStudentCollection: function(payload) {
    const serializer = this;
    const found = payload && payload.content && payload.content.length;

    if (found){
      let content = payload.content[0];
      let collection = content.collection || content.assessment;
      let resources = content.resources || content.questions;
      return AssessmentResult.create({
        sessionId: payload.sessionId,
        score: collection.score,
        resourceId: collection.gooruOId,
        timeSpent: collection.timeSpent,
        views: collection.views,
        resourceResults: serializer.normalizeResourceResults(resources),
        startedAt: payload.startTime ? toLocal(payload.startTime) : toLocal(new Date().getTime()), /* TODO this should come from server */
        submittedAt: payload.endTime ? toLocal(payload.endTime) : null
      });
    }

    return false;
  }


});
