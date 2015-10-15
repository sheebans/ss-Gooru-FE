import Ember from 'ember';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend({

  /**
   * @property {[]} query params supported
   */
  queryParams: {'term' : 'term',
  'grades':'grades','subjects':'subjects'},

  /**
   * @property {string} term filter
   */
  term: null,

  /**
   * @property {string} grades filter
   */
  grades: null,
  /**
   * @property {string} subjects filter
   */
  subjects: null,

  actions: {

  }

});
