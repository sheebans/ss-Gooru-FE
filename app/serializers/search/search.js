import Ember from 'ember';
import ResourceModel from 'gooru-web/models/search/resource';

/**
 * Serializer to support Search functionality
 *
 * @typedef {Object} SearchSerializer
 */
export default Ember.Object.extend({

  normalizeSearchResource: function(payload) {
    const serializer = this;
    if (Ember.isArray(payload.searchResults)) {
      return payload.searchResults.map(function(result) {
        return ResourceModel.create({
          title: result.title,
          description: result.description,
          format: (result.resourceFormat ? result.resourceFormat.value : ''),
          publisher: (Ember.isArray(result.publisher) && result.publisher.length > 0 ? result.publisher[0] : ''),
          thumbnailUrl: (result.thumbnails ? result.thumbnails.url : ''),
          url: result.url,
          owner: Ember.Object.create(result.creator ? {
            id: result.creator.gooruUId,
            username: result.creator.username,
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
