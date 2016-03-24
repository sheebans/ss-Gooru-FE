import Ember from 'ember';

/**
 * Adapter to support the Search for Collections, Assessments, Resources and Questions
 *
 * @typedef {Object} SearchAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/gooru-search/rest/v2/search',

  /**
   * Fetches the collections that match with the term
   *
   * @param term the term to search
   * @param isTypeAssessment determines if the search is for assessments. By default is false.
   * @returns {Promise}
   */
  searchCollections: function(term, isTypeAssessment = false) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/scollection`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: term,
        'flt.collectionType': (isTypeAssessment ? 'assessment' : 'collection'),
        start: 1,
        length: 20
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Fetches the resources that match with the term
   *
   * @param term the term to search
   * @param categories the resource categories to filter the search
   * @returns {Promise}
   */
  searchResources: function(term, categories = []) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    let options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: term,
        start: 1,
        length: 20
      }
    };
    if (Ember.isArray(categories) && categories.length > 0) {
      options.data['flt.resourceFormat'] = categories.join(',');
    }
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'gooru-session-token': this.get('session.token')
    };
  }

});
