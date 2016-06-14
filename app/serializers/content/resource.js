import Ember from 'ember';
import ResourceModel from 'gooru-web/models/content/resource';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';

/**
 * Serializer to support the Resource CRUD operations for API 3.0
 *
 * @typedef {Object} ResourceSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  /**
   * @property {TaxonomySerializer} taxonomySerializer
   */
  taxonomySerializer: null,

  init: function () {
    this._super(...arguments);
    this.set('taxonomySerializer', TaxonomySerializer.create(Ember.getOwner(this).ownerInjection()));
  },

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
    const serializer = this;
    let serializedResource = {
      title: resourceModel.get('title'),
      description: resourceModel.get('description'),
      narration: resourceModel.get('narration'),
      'content_subformat': ResourceModel.serializeResourceFormat(resourceModel.get("format")),
      taxonomy: serializer.get('taxonomySerializer').serializeTaxonomy(resourceModel.get('standards')),
      'visible_on_profile': resourceModel.get('isVisibleOnProfile')//,
      //"depth_of_knowledge": null, // Not required at the moment
      //"thumbnail": null // Not required at the moment
    };
    if (resourceModel.get('info.amIThePublisher')) {
      serializedResource.info = {
        'am_i_the_publisher': true,
        'publisher': []
      };
    } else {
      serializedResource.info = {
        'am_i_the_publisher': false,
        'publisher': resourceModel.get('publisher')?resourceModel.get('publisher'):[]
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
    const standards = resourceData.taxonomy || {};
    const basePath = serializer.get('session.cdnUrls.content');
    const resource = ResourceModel.create(Ember.getOwner(serializer).ownerInjection(), {
      id: resourceData.id,
      title: resourceData.title,
      url: resourceData.url,
      format: format,
      description: resourceData.description,
      narration: resourceData.narration,
      publishStatus: resourceData.publish_status,
      standards: serializer.get('taxonomySerializer').normalizeTaxonomy(standards),
      owner: resourceData.creator_id,
      info: {
        amIThePublisher: resourceData.info && resourceData.info['am_i_the_publisher'] ? resourceData.info['am_i_the_publisher'] : false,
      },
      publisher: resourceData.info && resourceData.info.publisher[0] ? resourceData.info.publisher[0] : '',
      isVisibleOnProfile: typeof resourceData['visible_on_profile'] !== 'undefined' ? resourceData['visible_on_profile'] : true,
      order: resourceData.sequence_id,
      displayGuide: resourceData['display_guide']
    });

    //is full path if it has protocol
    const isFullPath = resourceData.url ? /^(?:[a-z]+:)?\/\//.exec(resourceData.url) : false;

    if (resource.get("isImageResource") || resource.get("isPDFResource")){
      if (!isFullPath){ // if it is a relative url, load from content cdn
        const url = resourceData.url ? basePath + resourceData.url : null;
        resource.set("url", url);
      }
    }

    if (resource.get("isUrlResource")) {
      if(resource.get("displayGuide") && (resource.get("displayGuide.is_broken") ===1 || resource.get("displayGuide.is_frame_breaker") ===1)) {
        var url = resource.get("url");
        var pattern = /^((http|https|ftp):\/\/)/;

        if(!pattern.test(url)) {
          url = "http:" + basePath + url;
        }
        resource.set("url", url);
      }
      else{
        if (!isFullPath){ //if no protocol add http as default
          const url = resourceData.url ? "http://" + resourceData.url : null;
          resource.set("url", url);
        }
      }
    }
    return resource;
  }
});

