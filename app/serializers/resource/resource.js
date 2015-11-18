import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({

  normalizeSingleResponse: function(store, primaryModelClass, payload) {
    var resourceModel = this.getExtendedResourceModel();
    resourceModel.data.id = payload.gooruOid;
    return resourceModel;
  },

  normalizeResource: function(payload) {
    // If payload contains a resource element then it corresponds to a Search resource
    if (payload.resource) {
      return this.normalizeResourceForSearch(payload);
    } else {
      var resourceModel = this.getBaseResourceModel();
      resourceModel.id = payload.gooruOid;
      resourceModel.attributes.resourceType = payload.resourceType.name;
      resourceModel.attributes.title = payload.title;
      resourceModel.attributes.description = payload.description;
      resourceModel.attributes.imageUrl = null;
      resourceModel.attributes.order = payload.itemSequence;

      if (payload.resourceType.name === 'assessment-question') {
        resourceModel.attributes.questionType = payload.typeName;
        resourceModel.attributes.text = payload.questionText;
        resourceModel.attributes.hints = [];
        resourceModel.attributes.explanation = payload.explanation;
      }

      return resourceModel;
    }
  },

  normalizeResourceForSearch: function(payload) {
    var resourceModel = this.getBaseResourceModel();
    resourceModel.id = payload.collectionItemId;
    resourceModel.attributes.resourceType = payload.resource.resourceType.name;
    resourceModel.attributes.title = payload.resource.title;
    resourceModel.attributes.description = payload.resource.title;
    resourceModel.attributes.imageUrl = this.getResourceImageUrl(payload.resource);
    resourceModel.attributes.order = 0;
    return resourceModel;
  },

  normalizeQuestionAnswers: function(answerItems, resource, model) {
    var answerRelationships = resource.relationships.answers.data;
    for (var i = 0; i < answerItems.length; i++) {
      var answerItem = answerItems[i];
      var answerModel = {
        type: 'resource/answer',
        id: resource.id + '_' + answerItem.sequence,
        attributes: {
          text: answerItem.answerText,
          answerType: answerItem.answerType,
          order: answerItem.sequence,
          isCorrect: answerItem.isCorrect
        }
      };
      model.included.push(answerModel);

      var answerRelationship = {
        type: answerModel.type,
        id: answerModel.id
      };
      answerRelationships.push(answerRelationship);
    }
  },

  getBaseResourceModel: function() {
    var resourceModel = {
      type: 'resource/question',
      id: null,
      attributes: {},
      relationships: {
        answers: { data: [] }
      }
    };
    return resourceModel;
  },

  getExtendedResourceModel: function() {
    var resourceModel = {
      data: this.getBaseResourceModel(),
      included: []
    };
    return resourceModel;
  },

  getResourceImageUrl: function(resource) {
    if (resource.thumbnails) {
      return resource.thumbnails.url;
    } else {
      return this.getDefaultResourceImageUrl(resource.resourceFormat.value);
    }
  },

  getDefaultResourceImageUrl: function(type) {
    return '/assets/gooru/default-' + type + '.png';
  }

});
