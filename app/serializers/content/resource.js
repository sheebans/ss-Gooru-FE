import Ember from 'ember';

/**
 * Serializer to support the Resource CRUD operations for API 3.0
 *
 * @typedef {Object} ResourceSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Resource object into a JSON representation required by the Create Resource endpoint
   *
   * @param resourceModel The Resource model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateResource: function(resourceModel) {
    return {
      title: resourceModel.get('title'),
      url: resourceModel.get("url"),
      content_subformat: resourceModel.get("format")
    };
  }


});

