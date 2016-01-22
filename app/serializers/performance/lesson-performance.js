import Ember from 'ember';
import DS from 'ember-data';

/**
 * Lesson serializer for LessonPerformance model
 *
 * @typedef {Object} LessonPerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({

  normalizeQueryRecordResponse: function(store, primaryModelClass, payload) {
    const hasResults = payload.content.length > 0;
    var model = { data: [] };

    if (hasResults) {
      var results = payload.content[0].usageData;
      Ember.$.each(results, function(index, result){
        var item = {
          id: result.lessonId,
          type: "performance/lesson-performance",
          attributes: {
            score: result.scoreInPercentage,
            completionDone:  result.completionCount,
            completionTotal: result.totalCount,
            timeSpent: result.timeSpent,
            ratingScore: 0,
            attempts: result.attempts
          }
        };
        model.data.push(item);
      });
    }
    return model;
  }

});
