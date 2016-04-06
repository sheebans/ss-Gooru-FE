import Ember from 'ember';
import MyClassesModel from 'gooru-web/models/class/my-classes';
import ClassDetailsModel from 'gooru-web/models/class/class-details';

/**
 * Serializer to support the Profile CRUD operations for API 3.0
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend({

  /**
   * Normalize the classes details response
   * @param payload is the endpoint response in JSON format
   * @returns {ClassDetailsModel} a my classes model object
   */
  normalizeClassesDetails: function(payload) {
    let normalizedClasses = [];
    let classes = payload.classes;
    classes.forEach(function(theClass) {
      normalizedClasses.push(ClassDetailsModel.create({
        id: theClass.id,
        creatorId: theClass['creator_id'],
        title: theClass.title,
        description: theClass.description,
        greeting: theClass.greeting,
        grade: theClass.grade,
        classSharing: theClass['class_sharing'],
        coverImage: theClass['cover_image'],
        code: theClass.code,
        minScore: theClass['min_score'],
        endDate: theClass['end_date'],
        courseId: theClass['course_id'],
        collaborator: theClass.collaborator,
        gooruVersion: theClass['gooru_version'],
        contentVisibility: theClass['content_visibility'],
        isArchived: theClass['is_archived'],
        isStudent: payload.member.indexOf(theClass.id) >= 0
      }));
    });
    return normalizedClasses;
  },

  /**
   * Normalize the user clasess endpoint response
   * @param payload is the endpoint response in JSON format
   * @returns {MyClassesModel} a my classes model object
   */
  normalizeMyClasses: function(payload) {
    const serializer = this;
    return MyClassesModel.create({
      ownerList: payload.owner,
      collaboratorList: payload.collaborator,
      memberList: payload.member,
      memberCount: payload['member_count'],
      classes: serializer.normalizeClassesDetails(payload)
    });
  }
});