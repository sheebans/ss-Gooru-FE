import Ember from 'ember';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend({

  /**
   * @property {[]} query params supported
   */
  queryParams: {'term' : 'term',
  'grades':'grades','subject':'subject'},

  /**
   * @property {string} term filter
   */
  term: null,

  /**
   * @property {string} grades filter
   */
  grades: null,
  /**
   * @property {string} subject filter
   */
  subject: null,

  actions: {

  }

});
