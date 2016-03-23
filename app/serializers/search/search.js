import Ember from 'ember';
import ResourceModel from 'gooru-web/models/search/resource';

/**
 * Serializer to support Search functionality
 *
 * @typedef {Object} SearchSerializer
 */
export default Ember.Object.extend({

  normalizeSearchCollections: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return ResourceModel.create({
          id: result.id,
          title: result.title,
          description: result.description ? result.description : '',
          resourceCount: result.resourceCount ? result.resourceCount : 0,
          questionCount: result.questionCount ? result.questionCount : 0,
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

  normalizeSearchResources: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return ResourceModel.create({
          title: result.title,
          description: result.description ? result.description : '',
          format: (result.resourceFormat ? result.resourceFormat.value : ''),
          publisher: (Ember.isArray(result.publisher) && result.publisher.length > 0 ? result.publisher[0] : ''),
          thumbnailUrl: (result.thumbnails ? result.thumbnails.url : ''),
          url: result.url ? result.url : '',
          owner: Ember.Object.create(result.creator ? {
            id: result.creator.gooruUId,
            firstName: result.creator.firstname,
            lastName: result.creator.lastname,
            username: result.creator.usernameDisplay,
            avatarUrl: result.creator.profileImageUrl
          } : {}),
          standards: serializer.normalizeStandards(result)
        });
      });
    }
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
