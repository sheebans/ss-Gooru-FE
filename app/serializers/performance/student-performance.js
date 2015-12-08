import Ember from 'ember';
import DS from 'ember-data';

/**
 * Lesson serializer for StudentUnitPerformance model
 *
 * @typedef {Object} StudentUnitPerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({

  /**
   * Normalize a queryRecord response
   * @param store
   * @param primaryModelClass
   * @param payload
   * @returns {{data: Array}} returns a response following the ember data unit model
   */
  normalizeQueryRecordResponse: function(store, primaryModelClass, payload) {
    var model = { data: [] };
    var results = payload.content;
    var hasResults = results && results.length > 0;

    if (hasResults) {
      Ember.$.each(results, function(index, result){
        var item = {
          id: result.gooruOId,
          type: "performance/student-performance",
          attributes: {
            title: result.title,
            performanceType: result.type,
            score: result.scoreInPercentage,
            completionDone:  result.completionDone ? result.completionDone : 0,
            completionTotal: result.completionTotal ? result.completionTotal : 1,
            timeSpent: result.totalStudyTime ? result.totalStudyTime : result.timeSpent,
            ratingScore: result.rating ? result.rating : 1,
            attempts: result.assessmentsAttempted
          }
        };
        model.data.push(item);
      });
    }
    return model;
  }
});
