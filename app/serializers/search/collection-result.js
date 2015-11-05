import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeResponse: function(store, primaryModelClass, payload) {
    var collectionModel = {
      data: {
        id: '_none_',
        type: 'search/collection-result',
        attributes: {
          totalHitCount: payload.totalHitCount
        },
        relationships: {
          collections: { data: [] }
        }
      },
      included: []
    };
    normalizeCollections(payload.searchResults, collectionModel.data.relationships.collections.data, collectionModel);
    store.pushPayload(collectionModel);

    return collectionModel;
  }

});

function normalizeCollections(searchResults, relationshipItems, collectionModel) {
  for(var i = 0; i < searchResults.length; i++) {
    var result = searchResults[i];
    var collectionRelationship = {
      type: 'search/collection',
      id: result.id
    };
    relationshipItems.push(collectionRelationship);

    var collection =  {
      type: 'search/collection',
      id: result.id,
      attributes: {
        title: result.title,
        remixes: result.scollectionRemixCount,
        views: result.viewCount,
        imageUrl: result.thumbnails.url,
        url: '',
        author: result.creatornameDisplay,
        avatarUrl: 'http://profile-images.goorulearning.org.s3.amazonaws.com/' + result.creatorId + '.png',
        profilePageUrl: 'http://www.goorulearning.org/#profilepage&id=' + result.creatorId + '&user=' + result.creatornameDisplay,
        description: result.description,
        resourceCount: result.resourceCount,
        questionCount: result.questionCount,
        hasTeam: result.libraryNames.length > 0,
        libraries: getLibraries(result.libraryNames)
      },
      relationships: {
        resources: { data: [] },
        standards: { data: [] }
      }
    };
    normalizeCollectionResources(result.collectionItems, collection.relationships.resources.data, collectionModel);
    normalizeCollectionStandards(JSON.parse(result.taxonomyDataSet), collection.relationships.standards.data, collectionModel);
    collectionModel.included.push(collection);
  }
}

function normalizeCollectionResources(collectionItems, relationshipItems, collectionModel) {
  for(var i = 0; i < collectionItems.length; i++) {
    var collectionItem = collectionItems[i];
    var resourceRelationship = {
      type: 'search/resource',
      id: collectionItem.collectionItemId
    };
    relationshipItems.push(resourceRelationship);

    var resource = {
      type: 'search/resource',
      id: collectionItem.collectionItemId,
      attributes: {
        name: collectionItem.resource.title,
        imageUrl: getResourceImageUrl(collectionItem),
        type: collectionItem.resource.resourceFormat.value
      }
    };
    collectionModel.included.push(resource);
  }
}

function normalizeCollectionStandards(taxonomyDataSet, relationshipItems, collectionModel) {
  for(var i = 0; i < taxonomyDataSet.curriculum.curriculumCode.length; i++) {
    var standardCode = taxonomyDataSet.curriculum.curriculumCode[i];
    var standardDesc = taxonomyDataSet.curriculum.curriculumDesc[i];
    var standardRelationship = {
      type: 'search/standard',
      id: standardCode
    };
    relationshipItems.push(standardRelationship);

    var standard = {
      type: 'search/standard',
      id: standardCode,
      attributes: {
        name: standardCode,
        description: standardDesc
      }
    };
    collectionModel.included.push(standard);
  }
}

function getResourceImageUrl(collectionItem) {
  if (collectionItem.resource.thumbnails) {
    return collectionItem.resource.thumbnails.url;
  } else {
    return getDefaultResourceImageUrl(collectionItem.resource.resourceFormat.value);
  }
}

function getDefaultResourceImageUrl(type) {
  return '/assets/gooru/default-' + type + '.png';
}

function getLibraries(libraryNames) {
  var libraries = '';
  for(var i = 0; i < libraryNames.length; i++) {
    libraries += '<p>' + libraryNames[i] + '</p>';
  }
  return libraries;
}
