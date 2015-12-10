import Ember from 'ember';
import DS from 'ember-data';

/**
 * Lesson serializer for StudentPerformance model
 *
 * @typedef {Object} StudentPerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({

  /**
   * Normalizes a queryRecord response
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
            type: result.type,
            score: result.scoreInPercentage,
            completionDone:  0,
            completionTotal: 1,
            timeSpent: result.totalStudyTime,
            ratingScore: 0,
            attempts: result.assessmentsAttempted
          }
        };
        model.data.push(item);
      });
    }
    return model;
  }
});
