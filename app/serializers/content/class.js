import Ember from 'ember';
import ClassesModel from 'gooru-web/models/content/classes';
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
   *
   * @param payload is the endpoint response in JSON format
   * @returns {ClassModel} a class model object
   */
  normalizeReadClassInfo: function(payload) {
    return ClassModel.create({
      id: payload.id,
      creatorId: payload['creator_id'],
      code: payload.code,
      title: payload.title,
      description: payload.description,
      courseId: payload['course_id'],
      greeting: payload.greeting,
      grade:[], // TODO We need to get the grade values, we have just the IDs.
      classSharing: payload['class_sharing'],
      coverImage: payload['cover_image'],
      minScore: payload['min_score'],
      startDate: payload['created_at'],
      endDate: payload['end_date'],
      creatorSystem: '',
      contentVisibility: payload['content_visibility'],
      isArchived: payload['is_archived']
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

  /**
   * Normalize the user classes endpoint response
   * @param payload The endpoint response in JSON format
   * @returns {Classes} a classes model object
   */
  normalizeClasses: function(payload) {
    const serializer = this;
    return ClassesModel.create({
      ownerList: payload.owner,
      collaboratorList: payload.collaborator,
      memberList: payload.member,
      memberCount: payload['member_count'],
      classes: (function() {
        let normalizedClasses = [];
        if (payload.classes && payload.classes.length) {
          payload.classes.forEach(function(theClass) {
            normalizedClasses.push(serializer.normalizeReadClassInfo(theClass));
          });
        }
        return normalizedClasses;
      })()
    });
  },

  filterCollaborators: function(payload) {
    return this.filterElements(payload, 'collaborator');
  },

  filterMembers: function(payload) {
    return this.filterElements(payload, 'member');
  },

  filterElements: function(payload, property) {
    const serializer = this;
    let elements = payload[property];
    if (Ember.isArray(elements) && elements.length > 0) {
      return elements.map(function(elementId) {
        return serializer.get('profileSerializer').normalizeReadProfile(payload.details.findBy('id', elementId));
      }).compact();
    } else {
      return [];
    }
  }

});
