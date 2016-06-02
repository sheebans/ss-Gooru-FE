import Ember from 'ember';
import APITaxonomyService from 'gooru-web/services/api-sdk/taxonomy';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';
import { getCategoryFromSubjectId } from 'gooru-web/utils/taxonomy';

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
  },

  /**
   * Gets the Taxonomy Subjects for a Category from the cached taxonomy. If the subjects are not available then fetch
   * them from the Taxonomy API.
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
   * Gets the Taxonomy Courses for a Subject from the cached taxonomy. If the courses are not available then fetch
   * them from the Taxonomy API.
   *
   * @param {TaxonomyRoot} subject - The taxonomy subject
   * @returns {Promise}
   */
  getCourses(subject) {
    const service = this;
    const apiTaxonomyService = service.get('apiTaxonomyService');
    return new Ember.RSVP.Promise(function(resolve) {
      if (subject) {
        if (subject.get('courses') && subject.get('courses.length') > 0) {
          resolve(subject.get('courses'));
        } else {
          apiTaxonomyService.fetchCourses(subject.get('frameworkId'), subject.get('id'))
            .then(function(courses) {
              subject.set('courses', courses);
              resolve(courses);
            });
        }
      } else {
        resolve(null);
      }
    });
  },

  /**
   * Gets the Taxonomy Domains for a Course from the cached taxonomy. If the domains are not available then fetch
   * them from the Taxonomy API.
   *
   * @param {TaxonomyItem} course - The taxonomy course
   * @returns {Promise}
   */
  getDomains(subject, course) {
    const service = this;
    const apiTaxonomyService = service.get('apiTaxonomyService');
    return new Ember.RSVP.Promise(function(resolve) {
      if (subject && course) {
        if (course.get('children') && course.get('children.length') > 0) {
          resolve(subject.get('children'));
        } else {
          apiTaxonomyService.fetchDomains(subject.get('frameworkId'), subject.get('id'), course.get('id'))
            .then(function (domains) {
              subject.set('children', domains);
              resolve(domains);
            });
        }
      } else {
        resolve(null);
      }
    });
  },

  /**
   * Gets the Taxonomy Codes for a Domain from the cached taxonomy. If the codes are not available then fetch
   * them from the Taxonomy API.
   *
   * @param subject
   * @param course
   * @param domain
   * @returns {Ember.RSVP.Promise}
   */
  getCodes: function(subject, course, domain) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (subject && course && domain) {
        if (domain.get('children') && domain.get('children.length') > 0) {
          resolve(domain.get('children'));
        } else {
          const apiTaxonomyService = service.get('apiTaxonomyService');
          const frameworkId = subject.get('frameworkId');
          apiTaxonomyService.fetchCodes(subject.get('frameworkId'), subject.get('id'), course.get('id'), domain.get('id'))
            .then(function (codes) {
              const organizedCodes = service.organizeCodes(codes);
              domain.set('children', organizedCodes);
              resolve(organizedCodes);
            });
        }
      } else {
        resolve([]);
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
