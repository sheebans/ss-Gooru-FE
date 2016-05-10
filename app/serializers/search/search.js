import Ember from 'ember';

import ResourceModel from 'gooru-web/models/content/resource';
import QuestionModel from 'gooru-web/models/content/question';
import AssessmentModel from 'gooru-web/models/content/assessment';
import CollectionModel from 'gooru-web/models/content/collection';
import ProfileModel from 'gooru-web/models/profile/profile';

/**
 * Serializer to support Search functionality
 *
 * @typedef {Object} SearchSerializer
 */
export default Ember.Object.extend({

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
    return CollectionModel.create({
      id: collectionData.id,
      title: collectionData.title,
      image: collectionData.thumbnail,
      standards: [],//TODO missing at API response,
      publishStatus: null, //TODO missing at API response,
      learningObjectives: collectionData.languageObjective,
      resourceCount: collectionData.resourceCount || 0,
      questionCount: collectionData.questionCount || 0,
      remixCount: collectionData.scollectionRemixCount || 0,
      course: null, //TODO missing at API response,
      isVisibleOnProfile: collectionData.profileUserVisibility,
      owner: ProfileModel.create({
        "id": null, //TODO missing at API response
        "firstName": collectionData.userFirstName,
        "lastName": collectionData.userLastName,
        "avatarUrl": null, //TODO missing at API response,
        "username": null//TODO missing at API response
      })
    });
  },

  /**
   * Normalize an assessment
   * @param {*} assessmentData
   * @returns {Assessment}
   */
  normalizeAssessment: function (assessmentData){
    return AssessmentModel.create({
      id: assessmentData.id,
      title: assessmentData.title,
      image: assessmentData.thumbnail,
      standards: [],//TODO missing at API response,
      publishStatus: null, //TODO missing at API response,
      learningObjectives: assessmentData.languageObjective,
      resourceCount: assessmentData.resourceCount ? Number(assessmentData.resourceCount) : 0,
      questionCount: assessmentData.questionCount ? Number(assessmentData.questionCount) : 0,
      remixCount: assessmentData.scollectionRemixCount || 0,
      course: null, //TODO missing at API response,
      isVisibleOnProfile: assessmentData.profileUserVisibility,
      owner: ProfileModel.create({
        "id": null, //TODO missing at API response
        "firstName": assessmentData.userFirstName,
        "lastName": assessmentData.userLastName,
        "avatarUrl": null, //TODO missing at API response,
        "username": null//TODO missing at API response
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
      standards: [], //TODO missing standards at API response serializer.normalizeStandards(result)
    });
  },

  /**
   * Normalizes a resource
   * @param {*} result
   * @returns {Resource}
   */
  normalizeResource: function(result){
    const serializer = this;
    const resourceFormat = result.resourceFormat.value;    
    const format = ResourceModel.normalizeResourceFormat(result.contentSubFormat);
    return ResourceModel.create({
      id: result.gooruOid,
      title: result.title,
      description: result.description,
      format: format,
      url: result.url,
      publisher: null, //TODO missing publisher at API response,
      thumbnailUrl: result.thumbnail, // TODO missing at API response
      owner: result.user ? serializer.normalizeOwner(result.user) : null,
      standards: [] //TODO missing standards at API response serializer.normalizeStandards(result)
      //publisherStatus //TODO missing at API response
    });
  },

  /**
   * Normalizes owner
   * @param ownerData
   * @returns {Profile}
   */
  normalizeOwner: function (ownerData) {
    return ProfileModel.create({
      id: ownerData.gooruUId,
      firstName: ownerData.firstName,
      lastName: ownerData.lastName,
      username: ownerData.usernameDisplay, //TODO missing username on API response
      avatarUrl: ownerData.profileImageUrl //TODO missing username on API response
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
  }

});
