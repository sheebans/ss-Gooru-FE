import Ember from 'ember';
import TaxonomySerializer from 'gooru-web/serializers/taxonomy/taxonomy';
import TaxonomyAdapter from 'gooru-web/adapters/taxonomy/taxonomy';
import { TAXONOMY_CATEGORIES } from 'gooru-web/config/config';
import { generateTaxonomyTestTree } from 'gooru-web/utils/taxonomy';

/**
 * Service for the Taxonomies
 *
 * @typedef {Object} TaxonomyService
 */
export default Ember.Service.extend({

  taxonomySerializer: null,

  taxonomyAdapter: null,

  /**
   * @property {Array} An object that contains the hierarchy of taxonomy
   * It gets populated progressively during application browsing, as data
   * is getting retreived it gets stored in this property to prevent
   * reduntant hist to the API
   */
  taxonomy: null,

  // TODO: Remove after logic for taxonomy tree creation is ready
  tempTree: null,

  init() {
    this._super(...arguments);
    this.set('taxonomySerializer', TaxonomySerializer.create(Ember.getOwner(this).ownerInjection()));
    this.set('taxonomyAdapter', TaxonomyAdapter.create(Ember.getOwner(this).ownerInjection()));

    // TODO: Remove after logic for taxonomy tree creation is ready
    // Init taxonomy tree for testing the selection of unit domains
    var taxonomyTree = generateTaxonomyTestTree(3, null, 2);
    this.set('tempTree', taxonomyTree);
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
   * Gets the Taxonomy Subjects for a classification type
   * from the API or cache if available
   *
   * @param type the classification type
   * @returns {Promise}
   */
  getSubjects(type) {
    const service = this;
    return new Ember.RSVP.Promise(function(resolve) {
      var taxonomy = service.get('taxonomy');
      if (taxonomy) {
        resolve(taxonomy[type]);
      } else {
        let promises = [];
        let taxonomy = {};
        TAXONOMY_CATEGORIES.forEach(function(category) {
          var promise = service.fetchSubjects(category.value).then(function(subjectsLists) {
            taxonomy[category.value] = subjectsLists;
          });
          return promises.push(promise);
        });
        Ember.RSVP.all(promises).then(function() {
          service.set('taxonomy', taxonomy);
          resolve(taxonomy[type]);
        });
      }
    });
  },

  /**
   * Finds a Taxonomy Subject by ID and category
   *
   * @param {String} category - The classification type
   * @param {String} subjectId - The subject id
   * @returns {TaxonomyRoot}
   */
  findSubjectById(category, subjectId) {
    var subject = null;
    var categoryBucket = this.get('taxonomy')[category];
    categoryBucket.every(function(subjectItem) {
      if (subjectItem.get('id') === subjectId) {
        subject = subjectItem;
        return false;
      }
      let children = subjectItem.get('children');
      if (children.length > 0) {
        children.every(function(child) {
          if (child.get('id') === subjectId) {
            subject = child;
            return false;
          }
          return true;
        });
        if (subject) {
          return false;
        }
      }
      return true;
    });
    return subject;
  },

  // TODO: Remove after logic for taxonomy tree creation is ready
  getCourses: function() {
    return this.get('tempTree');
  }
});
