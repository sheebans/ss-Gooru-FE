import Ember from 'ember';
import Resource from 'gooru-web/models/content/resource';
import {RESOURCE_FORMAT_MAP} from 'gooru-web/config/config';

/**
 * Serializer to support the Resource CRUD operations for API 3.0
 *
 * @typedef {Object} ResourceSerializer
 */
export default Ember.Object.extend({

  /**
   * Serializes the resource format to be API compliant
   * @param format
   * @returns {string}
   */
  serializeResourceFormat: function (format) {
    return format ? `${format}_resource` : undefined;
  },

  /**
   * Normalizes the resource format to be App compliant
   * @param format
   * @returns {string}
   */
  normalizeResourceFormat: function (format) {
    return format ? format.split("_")[0] : undefined;// i.e video_resource to video
  },

  /**
   * Serialize a Resource object into a JSON representation required by the Create Resource endpoint
   *
   * @param resourceModel The Resource model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateResource: function(resourceModel) {
    const format = this.serializeResourceFormat(resourceModel.get("format"));
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

    const format = this.normalizeResourceFormat(resourceData.content_subformat);
    return Resource.create({
      id: resourceData.id,
      title: resourceData.title,
      url: resourceData.url,
      format: format
    });
  }


});

