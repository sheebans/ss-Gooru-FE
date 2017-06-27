import Ember from 'ember';
import ConfigurationMixin from 'gooru-web/mixins/configuration';
import LibraryModel from 'gooru-web/models/library/library';

/**
 * Serializer to support the Library CRUD operations for API 3.0
 *
 * @typedef {Object} LibrarySerializer
 */
export default Ember.Object.extend(ConfigurationMixin, {

  session: Ember.inject.service('session'),

  /**
   * Normalize the Fetch Libraries endpoint's response
   *
   * @param payload is the endpoint response in JSON format
   * @returns {Library[]} an array of libraries
   */
  normalizeFetchLibraries: function(payload) {
    var result = [];
    const serializer = this;
    const libraries = payload.libraries;
    if (Ember.isArray(libraries)) {
      result = libraries.map(library => serializer.normalizeLibrary(library));
    }
    return result;
  },

  normalizeLibrary: function(libraryPayload) {
    var serializer = this;
    return LibraryModel.create(Ember.getOwner(serializer).ownerInjection(), {
      id: libraryPayload.id,
      name: libraryPayload.name,
      image: libraryPayload.thumbnail,
      tenantId: libraryPayload.tenant,
      tenantRoot: libraryPayload.tenant_root,
      courseCount: libraryPayload.course_count,
      assessmentCount: libraryPayload.assessment_count,
      collectionCount: libraryPayload.collection_count,
      resourceCount: libraryPayload.resource_count,
      questionCount: libraryPayload.question_count,
      rubricCount: libraryPayload.rubric_count,
      sequence: libraryPayload.sequence_id
    });
  }
});
