import Ember from 'ember';

/**
 * Serializer to support the Collection CRUD operations for API 3.0
 *
 * @typedef {Object} CollectionSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Collection object into a JSON representation required by the Create Collection endpoint
   *
   * @param collectionModel The Collection model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateCollection: function(collectionModel) {
    return this.serializeCollection(collectionModel);
  },

  /**
   * Serialize a Collection object into a JSON representation required by the Update Collection endpoint
   *
   * @param collectionModel The Collection model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateCollection: function(collectionModel) {
    return this.serializeCollection(collectionModel);
  },

  serializeCollection: function(collectionModel) {
    return {
      title: collectionModel.get('title'),
      learning_objective: collectionModel.get("learningObjectives")
    };
  }

});

