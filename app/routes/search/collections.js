import Ember from 'ember';

/**
 * @typedef {object} SearchCollectionsController
 */
export default Ember.Route.extend({

  /**
   * @property {[]} query params supported
   */
  queryParams: {'term' : 'term'},

  /**
   * @property {string} term filter
   */
  term: null,

  actions: {

  }

});
