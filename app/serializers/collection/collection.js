import DS from 'ember-data';
import ResourceSerializer from '../resource/resource';

export default DS.JSONAPISerializer.extend({

  normalizeSingleResponse: function(store, primaryModelClass, payload) {
    return this.normalizeCollection(payload);
  },

  normalizeCollection: function(payload) {
    var collectionModel = {
      data: {
        type: 'collection/collection',
        id: payload.gooruOid,
        attributes: {
          collectionType: payload.collectionType,
          title: payload.title,
          description: payload.description,
          imageUrl: payload.thumbnails ? payload.thumbnails.url : '',
          resourceCount: payload.summary ? payload.summary.resourceCount : 0,
          questionCount: payload.summary ? payload.summary.questionCount : 0
        },
        relationships: {
          resources: { data: [] }
        }
      },
      included: []
    };

    this.normalizeResources(payload.collectionItems, collectionModel.data.relationships.resources.data, collectionModel);

    return collectionModel;
  },

  normalizeResources: function(resources, resourceRelationships, collectionModel) {
    for(var i = 0; i < resources.length; i++) {
      const resourceSerializer = ResourceSerializer.create();
      var resource = resourceSerializer.normalizeResource(resources[i]);
      collectionModel.included.push(resource);

      var resourceRelationship = {
        type: resource.type,
        id: resource.id
      };
      resourceRelationships.push(resourceRelationship);

      resourceSerializer.normalizeQuestionAnswers(resources[i].answers, resource, collectionModel);

    }
  }

});
