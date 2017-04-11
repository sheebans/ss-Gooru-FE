import Ember from 'ember';
import MapContext from 'gooru-web/models/map/map-context';
import MapSuggestion from 'gooru-web/models/map/map-suggestion';

/**
 * Serializer to support the map operations
 *
 * @typedef {Object} GoalSerializer
 */
export default Ember.Object.extend({


  /**
   * Serialize a MapContext object into a JSON representation
   *
   * @param {MapContext} model The model to be serialized
   * @returns {Object} JSON Object representation of the model
   */
  serializeMapContext:function (model) {
    return {
      course_id: model.get('courseId'),
      class_id: model.get('classId'),
      unit_id: model.get('unitId'),
      lesson_id: model.get('lessonId'),
      collection_id: model.get('collectionId'),
      collection_type: model.get('collectionType'),
      collection_subtype: model.get('collectionSubType'),
      current_item_id: model.get('itemId'),
      current_item_type: model.get('itemType'),
      state: model.get('status'),
      path_id: model.get('pathId'),
      score_percent: model.get('score')
    };
  },

  /**
   * Normalize an array of goals
   *
   * @param payload endpoint response format in JSON format
   * @returns {Goal[]}
   */
  normalizeMapSuggestions: function(payload = []) {
    const serializer = this;
    let suggestions = [];
    if (payload && Ember.isArray(payload)) {
      suggestions = payload.map(function(suggestion) {
        return serializer.normalizeMapSuggestion(suggestion);
      });
    }

    return suggestions;
  },

  /**
   * Normalize a map context
   * @param {*} data
   * @return {MapContext}
   */
  normalizeMapContext: function (data) {
    return MapContext.create(Ember.getOwner(this).ownerInjection(), {
      courseId: data.course_id,
      classId: data.class_id,
      unitId: data.unit_id,
      lessonId: data.lesson_id,
      collectionId: data.collection_id,
      collectionType: data.collection_type,
      collectionSubType: data.collection_subtype,
      itemId: data.current_item_id,
      itemType: data.current_item_type,
      status: data.state,
      pathId: data.path_id,
      score: data.score_percent
    });
  },

  /**
   * Normalize a map suggestion
   * @param {*} data
   * @return {MapSuggestion}
   */
  normalizeMapSuggestion: function (data) {
    return MapSuggestion.create(Ember.getOwner(this).ownerInjection(), {
      id: data.id,
      title: data.title,
      type: data.type
    });
  }

});
