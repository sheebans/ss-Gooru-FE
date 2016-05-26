import Ember from 'ember';
import TaxonomyRoot from 'gooru-web/models/taxonomy/taxonomy-root';

/**
 * Serializer for Taxonomy endpoints
 *
 * @typedef {Object} ProfileSerializer
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  /**
   * Normalize the Fetch Taxonomy Subjects endpoint's response
   * @param payload is the endpoint response in JSON format
   * @returns {Subject[]} an array of subjects
   */
  normalizeFetchSubjects: function(payload) {
    var result = [];
    const serializer = this;
    const subjects = payload.subjects;
    if (Ember.isArray(subjects)) {
      result = subjects.map(function(subject) {
        return serializer.normalizeSubject(subject);
      });
    }
    return result;
  },

  normalizeSubject: function(subjectPayload, parentTitle) {
    var serializer = this;
    return TaxonomyRoot.create(Ember.getOwner(serializer).ownerInjection(), {
      id: subjectPayload['taxonomy_subject_id'] ? subjectPayload['taxonomy_subject_id'] : subjectPayload.id,
      frameworkId: subjectPayload['standard_framework_id'],
      title: subjectPayload.title,
      subjectTitle: parentTitle
        ? `${subjectPayload['standard_framework_id']} ${parentTitle}`
        : subjectPayload.title,
      code: subjectPayload.code,
      children: subjectPayload.frameworks ? subjectPayload.frameworks.map(function(framework) {
        return serializer.normalizeSubject(framework, subjectPayload.title);
      }) : []
    });
  }

});
