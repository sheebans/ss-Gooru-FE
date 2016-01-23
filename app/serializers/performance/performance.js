import Ember from 'ember';
import DS from 'ember-data';

/**
 * Serializer for Performance model
 *
 * @typedef {Object} PerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({

  /**
   * Normalizes the response for the QueryRecord method
   * @param store
   * @param primaryModelClass
   * @param payload
   * @returns {Performance|Performance[]} returns a Performance object or Performance array
   */
  normalizeQueryRecordResponse: function(store, primaryModelClass, payload) {
    const serializer = this;
    const hasResults = payload.content.length > 0;
    var model = { data: [] };

    if (hasResults) {
      var results = payload.content[0].usageData;
      Ember.$.each(results, function(index, result){
        var item = {
          id: serializer.getModelId(result),
          type: serializer.getModelType(),
          attributes: {
            type: serializer.getObjectType(result),
            score: result.scoreInPercentage,
            completionDone:  result.completionCount,
            completionTotal: result.totalCount,
            timeSpent: result.timeSpent,
            attempts: result.attempts,
            ratingScore: 0
          }
        };
        model.data.push(item);
      });
    }
    return model;
  }

});
