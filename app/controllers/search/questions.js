import Ember from 'ember';
import BaseController from 'gooru-web/controllers/search/base-controller';

/**
 * Questions search controller
 *
 */
export default BaseController.extend({
  // -------------------------------------------------------------------------
  // Dependencies

  // -------------------------------------------------------------------------
  // Attributes

  questionResults: Ember.computed.alias('searchResults'),

  // -------------------------------------------------------------------------
  // Actions

  // -------------------------------------------------------------------------
  // Events

  // -------------------------------------------------------------------------
  // Properties

  // -------------------------------------------------------------------------
  // Methods

  doSearch: function(term, params, callback, resetPagination) {
    this.get('searchService')
      .searchQuestions(term, params, resetPagination)
      .then(callback);
  }
});
