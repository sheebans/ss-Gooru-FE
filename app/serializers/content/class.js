import Ember from 'ember';
import ClassModel from 'gooru-web/models/content/class';

/**
 * Serializer to support the Class CRUD operations for API 3.0
 *
 * @typedef {Object} ClassSerializer
 */
export default Ember.Object.extend({

  /**
   * Serialize a Class object into a JSON representation required by the Create Class endpoint
   *
   * @param classModel The Class model to be serialized
   * @returns {Object} returns a JSON Object
   */
  serializeCreateClass: function(classModel) {
    return {
      title: classModel.get('title'),
      class_sharing: classModel.get('classSharing')
    };
  }


   * Normalize the Read Class info endpoint response
   * @param payload is the endpoint response in JSON format
   * @returns {ClassModel} a class model object
   */
  normalizeReadClassInfo: function(payload) {
    return ClassModel.create({
      id: payload.id,
      code: payload.code,
      title: payload.title,
      description: payload.description,
      greeting: payload.greeting,
      grade:[], // TODO We need to get the grade values, we have just the IDs.
      classSharing: payload['class_sharing'],
      coverImage: payload['cover_image'],
      minScore: payload['min_score'],
      endDate: payload['end_date'],
      collaborator: [],
      creatorSystem: ''
    });
  }

});

