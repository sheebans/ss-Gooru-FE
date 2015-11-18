import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeSingleResponse: function(store, primaryModelClass, payload) {
    var collectionModel = {
      data: {
        type: 'collection/collection',
        id: payload.gooruOid,
        attributes: {
          gooruOid: payload.gooruOid,
          collectionType: payload.collectionType,
          title: payload.title,
          description: payload.description,
          imageUrl: payload.thumbnails ? payload.thumbnails.url : '',
          resourceCount: payload.summary ? payload.summary.resourceCount : 0,
          questionCount: payload.summary ? payload.summary.questionCount : 0,
        },
        relationships: {
          collectionItems: []
        }
      },
      included: []
    };

    return collectionModel;
  }

});
