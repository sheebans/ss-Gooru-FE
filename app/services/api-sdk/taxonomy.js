import Ember from 'ember';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import TaxonomyAdapter from 'gooru-web/adapters/taxonomy/taxonomy';

/**
 * API-SDK Service for the Taxonomies back-end endpoints
 *
 * @typedef {Object} APITaxonomyService
 */
export default Ember.Service.extend({

  taxonomySerializer: null,

  taxonomyAdapter: null,

  init() {
    this._super(...arguments);
    this.set('taxonomySerializer', TaxonomySerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('taxonomyAdapter', TaxonomyAdapter.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Fetches the Taxonomy Subjects
   *
   * @param type the subjects type
   * @returns {Promise}
   */
  fetchSubjects: function(type) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('taxonomyAdapter').fetchSubjects(type)
        .then(function(response) {
          resolve(service.get('taxonomySerializer').normalizeFetchSubjects(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  /**
   * Fetches the Taxonomy Courses
   *
   * @param frameworkId - the framework ID
   * @param taxonomySubjectId - the taxonomy subject ID
   * @returns {Promise}
   */
  fetchCourses: function(frameworkId, taxonomySubjectId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('taxonomyAdapter').fetchCourses(frameworkId, taxonomySubjectId)
        .then(function(response) {
          resolve(service.get('taxonomySerializer').normalizeFetchCourses(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  /**
   * Fetches the Taxonomy Domains
   *
   * @param frameworkId - the framework ID
   * @param taxonomySubjectId - the taxonomy subject ID
   * @param taxonomyCourseId - the taxonomy course ID
   * @returns {Promise}
   */
  fetchDomains: function(frameworkId, taxonomySubjectId, taxonomyCourseId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('taxonomyAdapter').fetchDomains(frameworkId, taxonomySubjectId, taxonomyCourseId)
        .then(function(response) {
          resolve(service.get('taxonomySerializer').normalizeFetchDomains(response));
        }, function(error) {
          reject(error);
        });
    });
  },

  /**
   * Fetches the Taxonomy Codes
   *
   * @param frameworkId - the framework ID
   * @param subjectId - the taxonomy subject ID
   * @param courseId - the taxonomy course ID
   * @param domainId - the taxonomy domain ID
   * @returns {Promise}
   */
  fetchCodes: function(frameworkId, subjectId, courseId, domainId) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      service.get('taxonomyAdapter').fetchCodes(frameworkId, subjectId, courseId, domainId)
        .then(function(response) {
          resolve(service.get('taxonomySerializer').normalizeFetchCodes(response));
        }, function(error) {
          reject(error);
        });
    });
  }

});
