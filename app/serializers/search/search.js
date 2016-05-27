import Ember from 'ember';

import ResourceModel from 'gooru-web/models/content/resource';
import QuestionModel from 'gooru-web/models/content/question';
import AssessmentModel from 'gooru-web/models/content/assessment';
import CollectionModel from 'gooru-web/models/content/collection';
import CourseModel from 'gooru-web/models/content/course';
import ProfileModel from 'gooru-web/models/profile/profile';
import { DEFAULT_IMAGES } from 'gooru-web/config/config';

/**
 * Serializer to support Search functionality
 *
 * @typedef {Object} SearchSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  /**
   * Normalize the Search collections response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Collection[]}
   */
  normalizeSearchCollections: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeCollection(result);
      });
    }
  },

  /**
   * Normalize a collection
   * @param {*} collectionData
   * @returns {Collection}
   */
  normalizeCollection: function (collectionData){
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl = collectionData.thumbnail ? basePath + collectionData.thumbnail : DEFAULT_IMAGES.COLLECTION;
    const userThumbnailUrl = collectionData.userProfileImage ? basePath + collectionData.userProfileImage : DEFAULT_IMAGES.USER_PROFILE;
    const creatorThumbnailUrl = collectionData.creatorProfileImage ? basePath + collectionData.creatorProfileImage : DEFAULT_IMAGES.USER_PROFILE;

    const course = collectionData.course || {};
    return CollectionModel.create({
      id: collectionData.id,
      title: collectionData.title,
      thumbnailUrl: thumbnailUrl,
      standards: serializer.normalizeStandards(collectionData),
      publishStatus: collectionData.publishStatus,
      learningObjectives: collectionData.languageObjective,
      resourceCount: collectionData.resourceCount || 0,
      questionCount: collectionData.questionCount || 0,
      remixCount: collectionData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: collectionData.profileUserVisibility,
      owner: ProfileModel.create({
        "id": collectionData.gooruUId,
        "firstName": collectionData.userFirstName,
        "lastName": collectionData.userLastName,
        "avatarUrl": userThumbnailUrl,
        "username": collectionData.usernameDisplay
      }),
      creator: ProfileModel.create({
        "id": collectionData.creatorId,
        "firstName": collectionData.creatorFirstname,
        "lastName": collectionData.creatorLastname,
        "avatarUrl": creatorThumbnailUrl,
        "username": collectionData.creatornameDisplay
      })
    });
  },

  /**
   * Normalize an assessment
   * @param {*} assessmentData
   * @returns {Assessment}
   */
  normalizeAssessment: function (assessmentData){
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl = assessmentData.thumbnail ? basePath + assessmentData.thumbnail : DEFAULT_IMAGES.ASSESSMENT;
    const ownerThumbnailUrl = assessmentData.userProfileImage ? basePath + assessmentData.userProfileImage : DEFAULT_IMAGES.USER_PROFILE;
    const creatorThumbnailUrl = assessmentData.creatorProfileImage ? basePath + assessmentData.creatorProfileImage : DEFAULT_IMAGES.USER_PROFILE;

    const course = assessmentData.course || {};
    return AssessmentModel.create({
      id: assessmentData.id,
      title: assessmentData.title,
      thumbnailUrl: thumbnailUrl,
      standards: serializer.normalizeStandards(assessmentData),
      publishStatus: assessmentData.publishStatus,
      learningObjectives: assessmentData.languageObjective,
      resourceCount: assessmentData.resourceCount ? Number(assessmentData.resourceCount) : 0,
      questionCount: assessmentData.questionCount ? Number(assessmentData.questionCount) : 0,
      remixCount: assessmentData.scollectionRemixCount || 0,
      course: course.title,
      courseId: course.id,
      isVisibleOnProfile: assessmentData.profileUserVisibility,
      owner: ProfileModel.create({
        "id": assessmentData.gooruUId,
        "firstName": assessmentData.userFirstName,
        "lastName": assessmentData.userLastName,
        "avatarUrl": ownerThumbnailUrl,
        "username": assessmentData.usernameDisplay
      }),
      creator: ProfileModel.create({
        "id": assessmentData.creatorId,
        "firstName": assessmentData.creatorFirstname,
        "lastName": assessmentData.creatorLastname,
        "avatarUrl": creatorThumbnailUrl,
        "username": assessmentData.creatornameDisplay
      })
    });
  },

  /**
   * Normalize the Search assessments response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Assessment[]}
   */
  normalizeSearchAssessments: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeAssessment(result);
      });
    }
  },

  /**
   * Normalize the Search resources response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Resource[]}
   */
  normalizeSearchResources: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeResource(result);
      });
    }
  },

  /**
   * Normalize the Search question response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Question[]}
   */
  normalizeSearchQuestions: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeQuestion(result);
      });
    }
  },

  /**
   * Normalizes a question
   * @param {*} result
   * @returns {Question}
   */
  normalizeQuestion: function(result){
    const serializer = this;
    const format = result.resourceFormat.value; //value should be 'question'
    const type = QuestionModel.normalizeQuestionType(result.typeName);
    return QuestionModel.create({
      id: result.gooruOid,
      title: result.title,
      description: result.description,
      format: format,
      publisher: null, //TODO missing publisher at API response,
      thumbnailUrl: result.thumbnail,
      type: type,
      owner: result.user ? serializer.normalizeOwner(result.user) : null,
      standards: serializer.normalizeStandards(result)
    });
  },

  /**
   * Normalizes a resource
   * @param {*} result
   * @returns {Resource}
   */
  normalizeResource: function(result){
    const serializer = this;
    const format = ResourceModel.normalizeResourceFormat(result.contentSubFormat);
    return ResourceModel.create({
      id: result.gooruOid,
      title: result.title,
      description: result.description,
      format: format,
      url: result.url,
      creator: result.creator ? serializer.normalizeOwner(result.creator) : null,
      owner: result.user ? serializer.normalizeOwner(result.user) : null,
      standards: serializer.normalizeStandards(result),
      publishStatus: result.publishStatus
    });
  },

  /**
   * Normalizes owner
   * @param ownerData
   * @returns {Profile}
   */
  normalizeOwner: function (ownerData) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl =  ownerData.profileImageUrl ? basePath +  ownerData.profileImageUrl : DEFAULT_IMAGES.USER_PROFILE;

    return ProfileModel.create({
      id: ownerData.gooruUId,
      firstName: ownerData.firstName,
      lastName: ownerData.lastName,
      username: ownerData.usernameDisplay,
      avatarUrl: thumbnailUrl
    });
  },


  normalizeStandards(payload) {
    let standards = [];
    if (payload.taxonomyDataSet) {
      let taxonomy = JSON.parse(payload.taxonomyDataSet);
      let taxonomyCurriculum = taxonomy.curriculum;
      for (var i = 0; i < taxonomyCurriculum.curriculumCode.length; i++) {
        let standardCode = taxonomyCurriculum.curriculumCode[i];
        let standardDesc = taxonomyCurriculum.curriculumDesc[i];
        let standard = Ember.Object.create({
          code: standardCode,
          description: standardDesc
        });
        standards.push(standard);
      }
    }
    return standards;
  },

  /**
   * Normalize the Search course response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Course[]}
   */
  normalizeSearchCourses: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return serializer.normalizeCourse(result);
      });
    }
  },

  /**
   * Normalizes a course
   * @param {*} result
   * @returns {Course}
   */
  normalizeCourse: function(result){
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl = result.thumbnail ? basePath + result.thumbnail : DEFAULT_IMAGES.COURSE;
    return CourseModel.create({
      id: result.id,
      title: result.title,
      description: result.description,
      thumbnailUrl: thumbnailUrl,
      subject: result.subjectBucket,
      subjectSequence: result.subjectSequence,
      isVisibleOnProfile: result.visibleOnProfile,
      isPublished: result.publishStatus === 'published',
      unitCount: result.unitCount,
      taxonomy: result.taxonomy && result.taxonomy.subject ? result.taxonomy.subject.slice(0) : null,
      owner: result.owner ? serializer.normalizeOwner(result.owner) : null,
      sequence: result.sequence
    });
  }

});
