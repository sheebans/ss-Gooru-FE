import Ember from 'ember';
import ClassesModel from 'gooru-web/models/content/classes';
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
  },

  /**
   * Normalize a class response
   * @param payload The endpoint response in JSON format
   * @param memberList (optional) List of classes where the user is member
   * @returns {Class} a class model
   */
  normalizeClass: function(payload, memberList = []) {
    let classModel = ClassModel.create({
      id: payload.id ? payload.id : null,
      creatorId: payload['creator_id'] ? payload['creator_id'] : null,
      title: payload.title ? payload.title : null,
      description: payload.description ? payload.description : null,
      greeting: payload.greeting ? payload.greeting : null,
      grade: payload.grade ? payload.grade : [],
      classSharing: payload['class_sharing'] ? payload['class_sharing'] : null,
      coverImage: payload['cover_image'] ? payload['cover_image'] : null,
      code: payload.code ? payload.code : null,
      minScore: payload['min_score'] ? payload['min_score'] : null,
      endDate: payload['end_date'] ? payload['end_date'] : null,
      courseId: payload['course_id'] ? payload['course_id'] : null,
      collaborator: payload.collaborator ? payload.collaborator : [],
      creatorSystem: payload['creator_system'] ? payload['creator_system'] : null,
      contentVisibility: payload['content_visibility'] ? payload['content_visibility'] : null,
      isArchived: payload['is_archived'] ? payload['is_archived'] : false
    });
    if(memberList.length > 0) {
      classModel.set('isStudent', memberList.indexOf(payload.id) >= 0);
    }
    return classModel;
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
      classes: (function () {
        let normalizedClasses = [];
        if (payload.classes && payload.classes.length) {
          payload.classes.forEach(function (theClass) {
            normalizedClasses.push(serializer.normalizeClass(theClass, payload.member));
          });
        }
        return normalizedClasses;
      })()
    });
  }

});
