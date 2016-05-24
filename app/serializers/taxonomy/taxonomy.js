import Ember from 'ember';

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

  normalizeSubject: function(subjectPayload) {
    return Ember.Object.create({
      id: subjectPayload.id
      // TODO Normalization goes here
    });
  }

});
