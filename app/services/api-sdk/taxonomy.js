import Ember from 'ember';

import { generateTaxonomyTestTree } from 'gooru-web/utils/taxonomy';

/**
 * Taxonomy Service
 *
 * TODO
 * The implementations in this service are all mocks!
 *
 * Service responsible for retrieving taxonomy data for the application
 *
 * @module
 *
 * @typedef {Object} LogService
 * @augments Ember/Service
 */
export default Ember.Service.extend({

  init() {
    // Init taxonomy tree
    var taxonomyTree = generateTaxonomyTestTree(3, null, 2);
    this.set('taxonomy', taxonomyTree);
  },

  getCourses: function() {
    return this.get('taxonomy');
  },

  //getDomains: function(rootId, courseId) {
  //
  //},
  //
  //getStandards: function(rootId, courseId, domainId) {
  //
  //},

  taxonomy: null

});
