import Ember from 'ember';
import DS from 'ember-data';

/**
 * Unit serializer for Unit model
 *
 * @typedef {Object} UnitSerializer
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
    var unitModel = { data: [] },
      results = payload,
      hasResults = results && results.length > 0;
    if (hasResults) {
      Ember.$.each(results, function(index, result){
        var classItem = {
          id: result.gooruOid,
          type: "unit/unit",
          attributes: {
            title: result.title,
            collection: result.collectionId,
            visibility: result.visibility
          }
        };
        unitModel.data.push(classItem);
      });
    }
    return unitModel;
  }
});
