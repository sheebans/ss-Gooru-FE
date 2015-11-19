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

  normalizeResources: function(collectionItems, resourceRelationships, collectionModel) {
    console.log('Calling normalizeResources()...');
    console.log(collectionItems);
    const resourceSerializer = ResourceSerializer.create();
    for(var i = 0; i < collectionItems.length; i++) {
      var collectionItem = collectionItems[i];
      var resource = resourceSerializer.normalizeResource(collectionItem);
      collectionModel.included.push(resource);

      var resourceRelationship = {
        type: resource.type,
        id: resource.id
      };
      resourceRelationships.push(resourceRelationship);

      if (collectionItem.resourceFormat.value === 'question') {
        resourceSerializer.normalizeQuestionAnswers(collectionItem.answers, resource, collectionModel);
      }

    }
  }

});
