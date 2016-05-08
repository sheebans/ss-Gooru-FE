import Ember from 'ember';
import ProfileModel from 'gooru-web/models/profile/profile';
import Env from 'gooru-web/config/environment';
import ResourceModel from 'gooru-web/models/content/resource';
import AssessmentModel from 'gooru-web/models/content/assessment';
import QuestionModel from 'gooru-web/models/content/question';
import CollectionModel from 'gooru-web/models/content/collection';
import { DEFAULT_IMAGES } from "gooru-web/config/config";

/**
 * Serializer to support the Profile CRUD operations for API 3.0
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  /**
   * Serialize a Profile object into a JSON representation required by the Create Profile endpoint
   * @param profileData the profile object
   * @returns {Object} returns a JSON Object
   */
  serializeCreateProfile: function(profileData) {
    return {
      firstname: profileData.get('firstName'),
      lastname: profileData.get('lastName'),
      username: profileData.get('username'),
      'email_id': profileData.get('email'),
      password: profileData.get('password'),
      'birth_date': profileData.get('dateOfBirth'),
      'user_category': profileData.get('role'),
      gender: null,
      grade: []
    };
  },

  /**
   * Serialize a Profile object into a JSON representation required by the Update Profile endpoint
   * @param profile
   * @returns {Object} returns a JSON Object
   */
  serializeUpdateProfile: function(profile) {
    return {
      firstname: profile.get('firstName'),
      lastname: profile.get('lastName'),
      'user_category': profile.get('role'),
      grade: profile.get('grades'),
      country: profile.get('country'),
      state: profile.get('state'),
      school: profile.get('school'),
      'school_district': profile.get('schoolDistrict'),
      'about_me': profile.get('aboutMe'),
      'country_id': profile.get('countryId'),
      'state_id': profile.get('stateId'),
      'school_id': profile.get('schoolId'),
      'school_district_id': profile.get('schoolDistrictId')
    };
  },

  normalizeCreateProfile: function(payload) {
    return {
      token: Env['API-3.0']['user-token-api-2.0'],
      'token-api3': payload['access_token'],
      user: {
        username: payload.username,
        gooruUId: payload['user_id'],
        isNew: true
      },
      isAnonymous: false
    };
  },

  /**
   * Normalize the Read Profile endpoint response
   * @param payload is the endpoint response in JSON format
   * @returns {ProfileModel} a profile model object
   */
  normalizeReadProfile: function(payload) {
    const serializer = this;
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl = payload['thumbnail_path'] ?
    basePath + payload['thumbnail_path'] : DEFAULT_IMAGES.USER_PROFILE;

    return ProfileModel.create({
      id: payload.id,
      firstName: payload.firstname,
      lastName: payload.lastname,
      username: payload.username,
      email: payload['email_id'],
      gender: payload.gender,
      grades: payload.grade,
      dateOfBirth: payload['birth_date'],
      role: payload['user_category'],
      createdAt: payload['created_at'],
      lastUpdate: payload['updated_at'],
      countryId: payload['country_id'],
      country: payload.country,
      stateId: payload['state_id'],
      state: payload.state,
      schoolId: payload['school_id'],
      school: payload.school,
      schoolDistrictId: payload['school_district_id'],
      schoolDistrict: payload['school_district'],
      aboutMe: payload['about_me'],
      avatarUrl: thumbnailUrl,
      rosterId: payload['roster_id'],
      followers: payload.followers,
      followings: payload.followings,
      isFollowing: !!payload.isFollowing
    });
  },

  /**
   * Normalize the resources
   * @param payload
   * @returns {Resource[]}
   */
  normalizeReadResources: function(payload){
    const resources = payload.resources || [];
    const serializer = this;
    const owners = serializer.normalizeOwners(payload.owner_details || []);

    return resources.map(function(resourceData){
      return serializer.normalizeResource(resourceData, owners);
    });
  },

  /**
   * Normalize the questions
   * @param payload
   * @returns {Question[]}
   */
  normalizeReadQuestions: function(payload){
    const questions = payload.questions || [];
    const serializer = this;
    const owners = serializer.normalizeOwners(payload.owner_details || []);

    return questions.map(function(questionData){
      return serializer.normalizeQuestion(questionData, owners);
    });
  },

  /**
   * Normalize the collections
   * @param payload
   * @returns {Collection[]}
   */
  normalizeReadCollections: function(payload){
    const collections = payload.collections || [];
    const serializer = this;
    const owners = serializer.normalizeOwners(payload.owner_details || []);

    return collections.map(function(collectionData){
      return serializer.normalizeCollection(collectionData, owners);
    });
  },

  /**
   * Normalize the assessments
   * @param payload
   * @returns {Assessment[]}
   */
  normalizeReadAssessments: function(payload){
    const assessments = payload.assessments || [];
    const serializer = this;
    const owners = serializer.normalizeOwners(payload.owner_details || []);

    return assessments.map(function(assessmentData){
      return serializer.normalizeAssessment(assessmentData, owners);
    });
  },

  /**
   * Normalizes a resource
   * @param {Object} resourceData
   * @param {[]} owners
   * @returns {Resource}
   */
  normalizeResource: function (resourceData, owners) {
    const serializer = this;
    const format = ResourceModel.normalizeResourceFormat(resourceData.content_subformat);
    const standards = resourceData.taxonomy || [];
    const creatorId = resourceData.creator_id;
    const filteredOwners = Ember.A(owners).filterBy("id", creatorId);
    return ResourceModel.create({
      id: resourceData.id,
      title: resourceData.title,
      description: resourceData.description,
      url: resourceData.url,
      format: format,
      publishStatus: resourceData.publish_status,
      standards: serializer.normalizeStandards(standards),
      owner: filteredOwners.get("length") ? filteredOwners.get("firstObject") : null
    });
  },

  /**
   * Normalizes a question
   * @param {Object} questionData
   * @param {[]} owners
   * @returns {Question}
   */
  normalizeQuestion: function (questionData, owners) {
    const serializer = this;
    const creatorId = questionData.creator_id;
    const filteredOwners = Ember.A(owners).filterBy("id", creatorId);
    const standards = questionData.taxonomy || [];
    const format = QuestionModel.normalizeQuestionType(questionData.content_subformat);
    return QuestionModel.create({
      id: questionData.id,
      title: questionData.title,
      text: questionData.description,
      format: questionData.content_format,
      type:format,
      publishStatus: questionData.publish_status,
      standards: serializer.normalizeStandards(standards),
      owner: filteredOwners.get("length") ? filteredOwners.get("firstObject") : null
    });
  },

  /**
   * Normalizes a collection
   * @param {Object} collectionData
   * @param {[]} owners
   * @returns {Collection}
   */
  normalizeCollection: function (collectionData, owners) {
    const serializer = this;
    const ownerId = collectionData.owner_id;
    const filteredOwners = Ember.A(owners).filterBy("id", ownerId);
    const standards = serializer.normalizeStandards(collectionData.taxonomy || []);
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl = collectionData.thumbnail ?
      basePath + collectionData.thumbnail : DEFAULT_IMAGES.COLLECTION;

    return CollectionModel.create({
      id: collectionData.id,
      title: collectionData.title,
      standards: standards,
      thumbnailUrl: thumbnailUrl,
      publishStatus: collectionData.publish_status,
      learningObjectives: collectionData.learning_objective,
      resourceCount: collectionData.resource_count,
      questionCount: collectionData.question_count,
      remixCount: collectionData.remix_count, //TODO missing on API
      course: collectionData.course_title,
      isVisibleOnProfile: collectionData.visible_on_profile,
      owner: filteredOwners.get("length") ? filteredOwners.get("firstObject") : null
    });
  },

  /**
   * Normalizes a assessment
   * @param {Object} assessmentData
   * @param {[]} owners
   * @returns {Assessment}
   */
  normalizeAssessment: function (assessmentData, owners) {
    const serializer = this;
    const ownerId = assessmentData.owner_id;
    const filteredOwners = Ember.A(owners).filterBy("id", ownerId);
    const standards = serializer.normalizeStandards(assessmentData.taxonomy || []);
    const basePath = serializer.get('session.cdnUrls.content');
    const thumbnailUrl = assessmentData.thumbnail ?
    basePath + assessmentData.thumbnail : DEFAULT_IMAGES.ASSESSMENT;

    return AssessmentModel.create({
      id: assessmentData.id,
      title: assessmentData.title,
      thumbnailUrl: thumbnailUrl,
      standards: standards,
      publishStatus: assessmentData.publish_status,
      learningObjectives: assessmentData.learning_objective,
      questionCount: assessmentData.question_count,
      remixCount: assessmentData.remix_count, //TODO missing on API
      course: assessmentData.course_title,
      isVisibleOnProfile: assessmentData.visible_on_profile,
      owner: filteredOwners.get("length") ? filteredOwners.get("firstObject") : null
    });
  },

  /**
   * Normalizes owners
   * @param payload
   * @returns {Content/User}
   */
  normalizeOwners: function (payload) {
    const serializer = this;
    return payload.map(function(ownerData){
      return serializer.normalizeReadProfile(ownerData);
    });
  },

  /**
   * Normalizes standards
   * @param {string[]} standards
   * @returns {Content/User}
   */
  normalizeStandards: function (standards) {
    return standards.map(function(standard){
      return Ember.Object.create({ code: standard, description: null });
    });
  }


});
