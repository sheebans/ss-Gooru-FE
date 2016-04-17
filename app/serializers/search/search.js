import Ember from 'ember';
import SearchCollectionModel from 'gooru-web/models/search/collection';

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
   * @returns {SearchCollectionModel[]}
   */
  normalizeSearchCollections: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return SearchCollectionModel.create({
          id: result.id,
          title: result.title,
          description: result.description ? result.description : '',
          resourceCount: result.resourceCount ? Number(result.resourceCount) : 0,
          questionCount: result.questionCount ? Number(result.questionCount) : 0,
          remixCount: result.scollectionRemixCount ? result.scollectionRemixCount : 0,
          course: result.subject ? result.subject : '',
          isPublic: (result.sharing ? result.sharing === 'public' : false),
          isAssessment: (result.collectionType ? result.collectionType === 'assessment' : false),
          thumbnailUrl: (result.thumbnails ? result.thumbnails.url : ''),
          owner: Ember.Object.create({
            id: result.creatorId,
            username: result.creatornameDisplay,
            firstName: result.creatorFirstname,
            lastName: result.creatorLastname,
            avatarUrl: 'http://profile-images.goorulearning.org.s3.amazonaws.com/' + result.creatorId + '.png'
          }),
          standards: serializer.normalizeStandards(result)
        });
      });
    }
  },

  /**
   * Normalize the Search resources response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Content/Resource[]}
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
   * @returns {Content/Question[]}
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
   * @returns {Content/Question}
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
   * @returns {Content/Resource}
   */
  normalizeResource: function(result){
    const serializer = this;
    const resourceFormat = result.resourceFormat.value;
    const format = ResourceModel.normalizeResourceFormat(resourceFormat);
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
