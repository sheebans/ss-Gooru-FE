import Ember from 'ember';
import DS from 'ember-data';

/**
 * Serializer for Performance model
 *
 * @typedef {Object} PerformanceSerializer
 */
export default DS.JSONAPISerializer.extend({

  /**
   * Normalizes a queryRecord response
   * @param store
   * @param primaryModelClass
   * @param payload
   * @returns {Performance[]} returns a Performance array
   */
  normalizeQueryRecordResponse: function(store, primaryModelClass, payload) {
    const serializer = this;
    const hasResults = payload.content.length > 0;

    var model = { data: [] };

    if (hasResults) {
      var results = payload.content[0].usageData;
      Ember.$.each(results, function(index, result){
        var item = {
          id: serializer.getObjectId(result),
          type: "performance/performance",
          attributes: {
            title: result.title,
            type: serializer.getObjectType(result),
            score: result.scoreInPercentage,
            completionDone:  result.completed,
            completionTotal: 1,
            timeSpent: result.timeSpent,
            ratingScore: 0,
            attempts: result.attempts
          }
        };
        model.data.push(item);
      });
    }
    console.log('Model:', model);
    return model;
  },

  getObjectId: function(payload) {
    if (payload.unitId) {
      return payload.unitId;
    } else if (payload.lessonId) {
      return payload.lessonId;
    } else if (payload.collectionId) {
      return payload.collectionId;
    } else if (payload.assessmentId) {
      return payload.assessmentId;
    } else {
      return null;
    }
  },

  getObjectType: function(payload) {
    if (payload.unitId) {
      return 'unit';
    } else if (payload.lessonId) {
      return 'lesson';
    } else if (payload.collectionId) {
      return 'collection';
    } else if (payload.assessmentId) {
      return 'assessment';
    } else {
      return null;
    }
  }

});
