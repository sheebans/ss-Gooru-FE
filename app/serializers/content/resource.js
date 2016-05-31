import Ember from 'ember';
import ResourceModel from 'gooru-web/models/content/resource';

/**
 * Serializer to support the Resource CRUD operations for API 3.0
 *
 * @typedef {Object} ResourceSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

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
   * Serialize a Resource object into a JSON representation required by the Update Resource endpoint
   *
   * @param resourceModel The Resource model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateResource: function(resourceModel) {
    let serializedResource = {
      'title': resourceModel.get('title'),
      'description': resourceModel.get('description'),
      'narration': resourceModel.get('narration'),
      'content_subformat': ResourceModel.serializeResourceFormat(resourceModel.get("format")),
      'taxonomy': resourceModel.get('standards'),
      'visible_on_profile': resourceModel.get('isVisibleOnProfile')//,
      //"depth_of_knowledge": null, // Not required at the moment
      //"thumbnail": null // Not required at the moment
    };
    if (resourceModel.get('metadata.amIThePublisher')) {
      serializedResource.metadata = {
        'am_i_the_publisher': true,
        'publisher': null
      };
    } else {
      serializedResource.metadata = {
        'am_i_the_publisher': false,
        'publisher': resourceModel.get('metadata.publisher')
      };
    }
    return serializedResource;
  },

  /**
   * Normalize the resource data into a Resource object
   * @param resourceData
   * @returns {Resource}
   */
  normalizeReadResource: function(resourceData) {
    const serializer = this;
    const format = ResourceModel.normalizeResourceFormat(resourceData.content_subformat);
    const standards = resourceData.taxonomy || [];
    const resource = ResourceModel.create(Ember.getOwner(serializer).ownerInjection(), {
      id: resourceData.id,
      title: resourceData.title,
      url: resourceData.url,
      format: format,
      description: resourceData.description,
      publishStatus: resourceData.publish_status,
      standards: serializer.normalizeStandards(standards),
      owner: resourceData.creator_id,
      metadata: {
        amIThePublisher: resourceData.metadata && resourceData.metadata['am_i_the_publisher'] ? resourceData.metadata['am_i_the_publisher'] : false,
        publisher: resourceData.metadata && resourceData.metadata.publisher ? resourceData.metadata.publisher : null
      },
      isVisibleOnProfile: typeof resourceData['visible_on_profile'] !== 'undefined' ? resourceData['visible_on_profile'] : true,
      order: resourceData.sequence_id
    });

    //is full path if it has protocol
    const isFullPath = resourceData.url ? /^(?:[a-z]+:)?\/\//.exec(resourceData.url) : false;

    if (resource.get("isImageResource") || resource.get("isPDFResource")){
      if (!isFullPath){ // if it is a relative url, load from content cdn
        const basePath = serializer.get('session.cdnUrls.content');
        const url = resourceData.url ? basePath + resourceData.url : null;
        resource.set("url", url);
      }
    }
    if (resource.get("isUrlResource")) {
      if (!isFullPath){ //if no protocol add http as default
        const url = resourceData.url ? "http://" + resourceData.url : null;
        resource.set("url", url);
      }
    }
    return resource;
  },

  /**
   * Normalizes standards
   *
   * @param {{*}} standards
   * @returns {*}
   */
  normalizeStandards: function (standards) {
    const values = [];
    if (!standards) { return values }

    for (var key in standards) {
      if (standards.hasOwnProperty(key)) {
        let standard = standards[key];
        values.push(Ember.Object.create({
          key: key,
          code: standard.code,
          title: standard.title,
          parentTitle: standard.parentTitle
        }));
      }
    }
    return values;
  }



});

