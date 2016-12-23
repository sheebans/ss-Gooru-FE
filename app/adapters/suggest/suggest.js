import Ember from 'ember';
import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({
  
  session: Ember.inject.service('session'),
  /**
   * @property {string} End-point URI
   */
  namespace: '/gooru-search/rest/suggest/v2',

  suggestResources: function(term, params = {}) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/resource`;

    const page = params.page || 0;
    const pageSize = params.pageSize || 3;
    const contentGOid = params.GOid || '';
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineHeaders(),
      data: {
        'searchTerm': term,
        'event': 'collection-edit',
        'contentGooruOid': contentGOid,
        'flt.publishStatus': 'published',
        'start': page + 1,
        'pageSize': pageSize
      }
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      //'Authorization': 'Token ' + this.get('session.token-api3')
      'Gooru-Session-Token': this.get('session.token-api3')
    };
  }
  
});
