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

    // TODO: Remove after logic for taxonomy tree creation is ready
    // Init taxonomy tree for testing the selection of unit domains
    var taxonomyTree = generateTaxonomyTestTree(4, null, 2);
    this.set('tempTree', taxonomyTree);
  },

  getCourses: function() {
    return this.get('tempTree');
  },

  // TODO: Remove after logic for taxonomy tree creation is ready
  tempTree: null

});
