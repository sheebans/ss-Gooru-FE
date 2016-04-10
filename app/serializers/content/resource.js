import Ember from 'ember';
import ResourceModel from 'gooru-web/models/content/resource';

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
    const format = ResourceModel.serializeResourceFormat(resourceModel.get("format"));
    return {
      title: resourceModel.get('title'),
      url: resourceModel.get("url"),
      content_subformat: format
    };
  },

  /**
   * Normalize the resource data into a Content/Resource object
   * @param resourceData
   * @returns {Content/Resource}
   */
  normalizeReadResource: function(resourceData){

    const format = ResourceModel.normalizeResourceFormat(resourceData.content_subformat);
    return ResourceModel.create({
      id: resourceData.id,
      title: resourceData.title,
      url: resourceData.url,
      format: format
    });
  }


});

