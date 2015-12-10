import Ember from 'ember';
import DS from 'ember-data';

/**
 * Lesson serializer for StudentLessonPerformance model
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
    var model = {
      data: [],
      included: []
    };

    var serializer = this;
    var results = payload.content;
    var hasResults = results && results.length > 0;

    if (hasResults) {
      Ember.$.each(results, function(index, result){
        var performanceItem = {
          id: result.gooruOId,
          type: "performance/student-lesson-performance",
          attributes: serializer.getNormalizedPerformanceAttributes(result),
          relationships: {
            collections: { data: [] }
          }
        };
        serializer.normalizeCollections(result.item, performanceItem, model);
        model.data.push(performanceItem);
      });
    }
    return model;
  },

  /**
   * Normalizes the Performance attributes
   * @param payload performance data
   * @returns {Object}
   */
  getNormalizedPerformanceAttributes: function(payload) {
    return {
      title: payload.title,
      type: payload.type,
      score: payload.scoreInPercentage,
      completionDone:  0,
      completionTotal: 1,
      timeSpent: payload.timeSpent,
      ratingScore: 0,
      attempts: 0
    };
  },

  /**
   * Normalizes the collection items for a lesson.
   * @param collections list of collections/assessments
   * @param performanceItem current performance item
   * @param model
   */
  normalizeCollections: function(collections, performanceItem, model) {
    var serializer = this;
    var hasCollections = collections && collections.length > 0;

    if (hasCollections) {
      Ember.$.each(collections, function (index, collection) {
        performanceItem.relationships.collections.data.push({
          id: collection.gooruOId,
          type: "performance/student-performance"
        });
        model.included.push({
          id: collection.gooruOId,
          type: "performance/student-performance",
          attributes: serializer.getNormalizedPerformanceAttributes(collection)
        });
      });
    }
  }
});
