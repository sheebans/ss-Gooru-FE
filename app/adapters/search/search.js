import Ember from 'ember';

/**
 * Adapter to support the Search for Collections, Assessments, Resources and Questions
 *
 * @typedef {Object} SearchAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/gooru-search/rest/v2/search',


  searchResources: function(term, categories) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        q: term,
        'flt.resourceFormat': (Ember.isArray(categories) && categories.length > 0 ? categories.join(',') : null),
        start: 1,
        length: 20
      }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'gooru-session-token': this.get('session.token')
    };
  }

});
