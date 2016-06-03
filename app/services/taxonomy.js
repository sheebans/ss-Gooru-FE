import Ember from 'ember';
import APITaxonomyService from 'gooru-web/services/api-sdk/taxonomy';
import TaxonomyItem from 'gooru-web/models/taxonomy/taxonomy-item';
import { TAXONOMY_CATEGORIES, CODE_TYPES } from 'gooru-web/config/config';
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
          resolve(course.get('children'));
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
   * Gets the Taxonomy Domains for a Course from the cached taxonomy. If the domains are not available then fetch
   * them from the Taxonomy API.
   *
   * @param {TaxonomyRoot} subject - The subject
   * @param {String} courseId - ID of course for which to find the domains
   * @returns {Promise}
   */
  getCourseDomains(subject, courseId) {
    const apiTaxonomyService = this.get('apiTaxonomyService');
    var course = subject.get('courses').find([courseId]);

    return new Ember.RSVP.Promise(function(resolve) {
      if (!course.get('children').length) {
        // No domains found ... ask for them
        apiTaxonomyService
          .fetchDomains(subject.get('frameworkId'), subject.get('id'), courseId)
          .then(function(domains) {
            course.set('children', domains);
            // Set reference to parent
            domains.forEach(function(domain) {
              domain.setProperties({
                parent: course,
                level: 2
              });
            });
            resolve(domains);
          });

      } else {
        resolve(course.get('children'));
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
    return new Ember.RSVP.Promise(function(resolve) {
      if (subject && course && domain) {
        if (domain.get('children') && domain.get('children.length') > 0) {
          resolve(domain.get('children'));
        } else {
          const apiTaxonomyService = service.get('apiTaxonomyService');
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
   * Gets the Taxonomy Codes for a Domain from the cached taxonomy. If the codes are not available then fetch
   * them from the Taxonomy API.
   *
   * @param {TaxonomyRoot} subject - The subject
   * @param {String} courseId - ID of course the domain belongs to
   * @param {String} domainId - ID of domain for which to find the standards
   * @returns {Promise}
   */
  getDomainCodes(subject, courseId, domainId) {
    const service = this;
    const apiTaxonomyService = this.get('apiTaxonomyService');
    var domain = subject.get('courses').find([courseId, domainId]);

    return new Ember.RSVP.Promise(function(resolve) {
      if (!domain.get('children').length) {
        // No standards found ... ask for them
        apiTaxonomyService
          .fetchCodes(subject.get('frameworkId'), subject.get('id'), courseId, domainId)
          .then(function(codes) {
            var standards = service.createStandardsHierarchy(codes);
            domain.set('children', standards);
            // Set reference to parent
            standards.forEach(function(standard) {
              standard.set('parent', domain);
            });
            resolve(standards);
          });

      } else {
        resolve(domain.get('children'));
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

  createStandardsHierarchy(codes) {
    var codeBuckets = this.sortCodes(codes);

    // Level 1 standards without parent (standard category)
    var L1parentless = codeBuckets[1].filter(function(codeObj) {
      return !codeObj.parentTaxonomyCodeId;
    });

    // Default standard category
    var L0DefaultParent = TaxonomyItem.create({
      id: 'default',
      title: '',
      level: 3
    });

    let level0_items = this.getStandardsAsTaxonomyItems(codeBuckets, null, null, 0);

    // Replace L1 codes with codes that don't have a reference to a parent
    codeBuckets[1] = L1parentless;
    L1parentless = this.getStandardsAsTaxonomyItems(codeBuckets, L0DefaultParent, null, 1);
    L0DefaultParent.set('children', L1parentless);

    level0_items.push(L0DefaultParent);
    return level0_items;
  },

  sortCodes(codes) {
    var codesLen = codes.length;
    var buckets = [];

    for (let i = Object.keys(CODE_TYPES).length - 1; i >= 0; --i) {
      // Make an array of arrays to store the different levels of standards
      buckets[i] = [];
    }

    for (let i = 0; i < codesLen; i++) {
      let code = codes[i];
      switch(code.code_type) {
        case CODE_TYPES.STANDARD_CATEGORY:
          buckets[0].push(code); break;
        case CODE_TYPES.STANDARD:
          buckets[1].push(code); break;
        case CODE_TYPES.SUB_STANDARD:
          buckets[2].push(code); break;
        case CODE_TYPES.LEARNING_TARGET_L0:
          buckets[3].push(code); break;
        case CODE_TYPES.LEARNING_TARGET_L1:
          buckets[4].push(code); break;
        case CODE_TYPES.LEARNING_TARGET_L2:
          buckets[5].push(code); break;
        default:
          Ember.Logger.error('Unknown code_type: ' + code.code_type);
      }
    }
    return buckets;
  },

  /**
   * Gets the Taxonomy standards for a domain
   * from the API or cache if available
   *
   * @param {Object[][]} codeBuckets - An array of arrays of code objects
   * @param {TaxonomyItem} parent - Parent taxonomy item to link the children to
   * @param {TaxonomyItem} parent - Id of the ancestor (the ancestor will not necessarily be
   * the parent taxonomy item.
   * @param {Number} bucketIndex - Index for the bucket where the codes are
   * @returns {TaxonomyItem[]} Taxonomy item with children assigned
   */
  getStandardsAsTaxonomyItems(codeBuckets, parent, parentId, bucketIndex) {
    const BASE_LEVEL = 3;  // standards base level
    const LT_LEVEL = 3
    var result = [];

    if (codeBuckets[bucketIndex] && codeBuckets[bucketIndex].length) {

      codeBuckets[bucketIndex].forEach(function(codeObj) {
        var taxonomyItem;

        if (!parentId || codeObj.parentTaxonomyCodeId === parentId || parentId === 'default') {
          let children;

          taxonomyItem = TaxonomyItem.create({
            id: codeObj.id,
            code: codeObj.code,
            title: codeObj.title,
            level: (bucketIndex >= LT_LEVEL) ? BASE_LEVEL + LT_LEVEL : BASE_LEVEL + bucketIndex,
            parent: (parentId) ? parent : null
          });

          result.push(taxonomyItem);

          if (bucketIndex >= LT_LEVEL) {
            children = this.getStandardsAsTaxonomyItems(codeBuckets, parent, taxonomyItem.get('id'), bucketIndex + 1);
            result = result.concat(children);
            parent.set('children', parent.get('children').concat(result));
          } else {
            children = this.getStandardsAsTaxonomyItems(codeBuckets, taxonomyItem, taxonomyItem.get('id'), bucketIndex + 1);
            taxonomyItem.set('children', children);
          }
        }
      }.bind(this));
    }
    return result;
  }

});
