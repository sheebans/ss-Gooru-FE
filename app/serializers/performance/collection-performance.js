import Ember from 'ember';
import DS from 'ember-data';

/**
 * CollectionPerformance serializer
 *
 * @typedef {Object} CollectionPerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({

  normalizeQueryRecordResponse: function(store, primaryModelClass, payload) {
    const serializer = this;
    const hasResults = payload.content.length > 0;
    var model = { data: [] };

    if (hasResults) {
      var results = payload.content[0].usageData;
      Ember.$.each(results, function(index, result){
        var item = {
          id: serializer.isCollection(result) ? result.collectionId : result.assessmentId,
          type: "performance/lesson-performance",
          attributes: {
            type: serializer.isCollection(result) ? 'collection' : 'assessment',
            score: result.scoreInPercentage,
            completionDone:  result.completed,
            completionTotal: result.itemCount,
            timeSpent: result.timeSpent,
            attempts: result.attempts,
            ratingScore: 0
          }
        };
        model.data.push(item);
      });
    }
    return model;
  },

  isCollection: function(payload) {
    return payload.collectionId ? true : false;
  }

});
