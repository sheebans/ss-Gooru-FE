import Ember from 'ember';
import DS from 'ember-data';

/**
 * Lesson serializer for Lesson model
 *
 * @typedef {Object} LessonSerializer
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
    var lessonModel = { data: [] },
      results = payload,
      hasResults = results && results.length > 0;
    if (hasResults) {
      Ember.$.each(results, function(index, result){
        var lessonItem = {
          id: result.gooruOid,
          type: "lesson/lesson",
          attributes: {
            title: result.title,
            collection: result.collectionId,
            visibility: result.visibility
          }
        };
        lessonModel.data.push(lessonItem);
      });
    }
    return lessonModel;
  }
});
