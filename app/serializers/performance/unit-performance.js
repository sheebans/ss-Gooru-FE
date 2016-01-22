import Ember from 'ember';
import DS from 'ember-data';

/**
 * Serializer for Unit-Performance model
 *
 * @typedef {Object} UnitPerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({

  /**
   * Normalizes a queryRecord response
   * @param store
   * @param primaryModelClass
   * @param payload
   * @returns {UnitPerformance[]} returns a UnitPerformance array
   */
  normalizeQueryRecordResponse: function(store, primaryModelClass, payload) {
    const hasResults = payload.content.length > 0;
    var model = { data: [] };

    if (hasResults) {
      var results = payload.content[0].usageData;
      Ember.$.each(results, function(index, result){
        var item = {
          id: result.unitId,
          type: "performance/unit-performance",
          attributes: {
            score: result.scoreInPercentage,
            completionDone:  result.completed,
            completionTotal: result.itemCount,
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
