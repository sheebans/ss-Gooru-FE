import Ember from 'ember';
import ClassModel from 'gooru-web/models/content/class';
import ProfileSerializer from 'gooru-web/serializers/profile/profile';

/**
 * Serializer to support the Class CRUD operations for API 3.0
 *
 * @typedef {Object} ClassSerializer
 */
export default Ember.Object.extend({

  init: function () {
    this._super(...arguments);
    this.set('profileSerializer', ProfileSerializer.create());
  },

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
  },

  /**
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
      startDate: payload['end_date'], // TODO We need to get the value from payload once it is implemented.
      endDate: payload['end_date'],
      collaborator: [],
      creatorSystem: ''
    });
  },

  /**
   * Normalize the response from class members endpoint
   * @param payload is the endpoint response in JSON format
   * @returns {ClassMembersModel} a class members model object
   */
  normalizeReadClassMembers: function(payload) {
    const serializer = this;
    return Ember.Object.create({
      owner: this.get('profileSerializer').normalizeReadProfile(payload.details.findBy('id', payload.owner[0])),
      collaborators: serializer.filterCollaborators(payload),
      members: serializer.filterMembers(payload)
    });
  },

  filterCollaborators: function(payload) {
    return this.filterElements(payload, 'collaborator');
  },

  filterMembers: function(payload) {
    return this.filterElements(payload, 'member');
  },

  filterElements: function(payload, property) {
    let elements = payload[property];
    if (Ember.isArray(elements) && elements.length > 0) {
      return elements.map(function(elementId) {
        return this.get('profileSerializer').normalizeReadProfile(payload.details.findBy('id', elementId));
      }).compact();
    } else {
      return [];
    }
  }

});

