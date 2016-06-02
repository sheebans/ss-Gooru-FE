import Ember from 'ember';
import APITaxonomyService from 'gooru-web/services/api-sdk/taxonomy';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';
import { getCategoryFromSubjectId } from 'gooru-web/utils/taxonomy';
import { generateTaxonomyTestTree } from 'gooru-web/utils/taxonomy';

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
   * application browsing, as data is getting retrieved it gets stored in this property to prevent redundant hits
   * to the API
   */
  taxonomyContainer: null,

  init() {
    this._super(...arguments);
    this.set('taxonomyContainer', {});
    this.set('apiTaxonomyService', APITaxonomyService.create(Ember.getOwner(this).ownerInjection()));

    // TODO: Remove after logic for taxonomy tree creation is ready
    // Init taxonomy tree for testing the selection of unit domains
    var taxonomyTree = generateTaxonomyTestTree(3, null, 2);
    this.set('tempTree', taxonomyTree);
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
   * Gets the Taxonomy courses for a subject from the API or cache if available
   *
   * @param {TaxonomyRoot} subject - The subject
   * @returns {Promise}
   */
  getCourses(subject) {
    const service = this;
    const apiTaxonomyService = service.get('apiTaxonomyService');
    return new Ember.RSVP.Promise(function(resolve) {
      apiTaxonomyService.fetchCourses(subject.get('frameworkId'), subject.get('id'))
        .then(function(courses) {
          subject.set('courses', courses);
          resolve(courses);
      });
    });
  },

  getCodes: function(subject, course, domain) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      var result = [];
      if (subject && course && domain) {
        const apiTaxonomyService = service.get('apiTaxonomyService');
        const frameworkId = subject.get('frameworkId');
        apiTaxonomyService.fetchCodes(subject.get('frameworkId'), subject.get('id'), course.get('id'), domain.get('id'))
          .then(function(codes) {
            result = service.organizeCodes(codes);
            domain.set('children', result);
            resolve(result);
          }, reject);
      } else {
        resolve(result);
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
  findSubjectById(subjectId, loadCourses = false) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve) {
      const category = getCategoryFromSubjectId(subjectId);
      var result = service.findSubject(category, subjectId);
      if (result && loadCourses) {
        service.retrieveSubjectCourses(result);
      }
      resolve(result);
    });
  },

  findSubject: function(categoryId, subjectId) {
    var result = null;
    const service = this;
    const taxonomyContainer = service.get('taxonomyContainer');
    if (taxonomyContainer) {
      const categorySubjects = taxonomyContainer[categoryId];
      if (categorySubjects) {
        result = categorySubjects.findBy('id', subjectId);
        if (!result) {
          categorySubjects.forEach(function (subject) {
            if (!result) {   // Array forEach function does not have a short circuit, so we are testing is the value has not been found, otherwise just jump to the next element
              result = subject.get('frameworks').findBy('id', subjectId);
            }
          });
        }
      }
    }
    return result;
  },

  findCourse: function(subject, courseId) {
    var result = null;
    if (subject) {
      result = subject.get('courses').findBy('id', courseId);
    }
    return result;
  },

  findDomain: function(course, domainId) {
    var result = null;
    if (course) {
      result = course.get('children').findBy('id', domainId);
    }
    return result;
  },

  organizeCodes: function(codes) {
    const firstLevelCodes = codes.filterBy('codeType', 'standard_level_1');
    return firstLevelCodes.map(function(firstLevelCode) {
      const secondLevelCodes = codes.filterBy('parentTaxonomyCodeId', firstLevelCode.get('id'));
      secondLevelCodes.forEach(function(secondLevelCode) {
        const thirdLevelCodes = codes.filterBy('parentTaxonomyCodeId', secondLevelCode.get('id'));
        secondLevelCode.set('children', thirdLevelCodes);
      });
      firstLevelCode.set('children', secondLevelCodes);
    });
  }

});
