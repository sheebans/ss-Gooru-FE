import Ember from 'ember';
import APITaxonomyService from 'gooru-web/services/api-sdk/taxonomy';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';

/**
 * Service for the Taxonomy Singleton elements container
 *
 * @typedef {Object} TaxonomyService
 */
export default Ember.Service.extend({

  /**
   * @property {APITaxonomyService} - the taxonomy service
   */
  apiTaxonomyService: null,

  /**
   * @property {Object} An object that contains the hierarchy of taxonomy. It gets populated progressively during
   * application browsing, as data is getting retrieved it gets stored in this property to prevent redundant hist
   * to the API
   */
  taxonomyContainer: null,

  init() {
    this._super(...arguments);
    this.set('taxonomyContainer', {});
    this.set('apiTaxonomyService', APITaxonomyService.create(Ember.getOwner(this).ownerInjection()));
  },

  /**
   * Gets the Taxonomy Subjects for a classification type from the API or cache if available
   *
   * @param {String} category - The classification type
   * @returns {Promise}
   */
  getSubjects(category) {
    const service = this;
    const apiTaxonomyService = service.get('apiTaxonomyService');
    return new Ember.RSVP.Promise(function(resolve) {
      var taxonomyContainer = service.get('taxonomyContainer');
      if (taxonomyContainer[category]) {
        resolve(taxonomyContainer[category]);
      } else {
        let promises = TAXONOMY_CATEGORIES.map(function(taxonomyCategory) {
          return apiTaxonomyService.fetchSubjects(taxonomyCategory.value).then(function(subjects) {
            taxonomyContainer[taxonomyCategory.value] = subjects;
          });
        });
        Ember.RSVP.all(promises).then(function() {
          resolve(taxonomyContainer[category]);
        });
      }
    });
  },

  /**
   * Finds a Taxonomy Subject by category and subject ID
   *
   * @param {String} category - The classification type
   * @param {String} subjectId - The subject id
   * @returns {TaxonomyRoot}
   */
  findSubjectById(category, subjectId) {
    var subjectResult = null;
    const service = this;
    const taxonomyContainer = service.get('taxonomyContainer');
    const categorySubjects = taxonomyContainer[category];

    if (categorySubjects) {
      subjectResult = categorySubjects.findBy('id', subjectId);
      if (!subjectResult) {
        categorySubjects.forEach(function(subject) {
          if (!subjectResult) {   // Array forEach function does not have a short circuit, so we are testing is the value has not been found, otherwise just jump to the next element
            subjectResult = subject.get('frameworks').findBy('id', subjectId);
          }
        });
      }
    }
    return subjectResult ? subjectResult : null;
  },

  getCourses: function() {
    return []
  }

});
