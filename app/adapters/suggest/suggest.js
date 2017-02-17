import Ember from 'ember';
import ApplicationAdapter from '../application';

export default ApplicationAdapter.extend({

  session: Ember.inject.service('session'),
  /**
   * @property {string} End-point URI
   */
  namespace: '/gooru-search/rest/suggest/v2',

  namespaceV3: '/gooru-search/rest/v3/suggest',

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

  /**
   * Gets resource suggestion for an specific resource in a context
   * @param {String} resourceId
   * @param {SuggestContext} context
   * @param {number} limit
   * @returns {*}
     */
  suggestResourcesForResource: function(resourceId, context, limit = 10) {
    const adapter = this;
    const namespace = this.get('namespaceV3');
    const url = `${namespace}/resource?limit=${limit}`;

    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineAuthorizationHeaders(),
      data: {
        "contextType": "resource-study-suggest",
        "resourceId": resourceId,
        "userId": context.get("userId"),
        "containerId": context.get('containerId') ? context.get('containerId') : undefined,
        "courseId": context.get("courseId") ? context.get("courseId") : undefined,
        "unitId": context.get("unitId") ? context.get("unitId") : undefined,
        "lessonId": context.get("lessonId") ? context.get("lessonId") : undefined
      }
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets resource suggestion for an specific collection/assessment in a context
   * @param {SuggestContext} context
   * @param {number} limit
   * @returns {*}
     */
  suggestResourcesForCollection: function(context, limit = 10) {
    const adapter = this;
    const namespace = this.get('namespaceV3');
    const url = `${namespace}/resource?limit=${limit}`;

    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      headers: adapter.defineAuthorizationHeaders(),
      data: JSON.stringify({
        "context":{
          "contextType": "collection-study",
          "containerId": context.get('containerId'),
          "userId": context.get("userId"),
          "courseId": context.get("courseId") ? context.get("courseId") : undefined,
          "unitId": context.get("unitId") ? context.get("unitId") : undefined,
          "lessonId": context.get("lessonId") ? context.get("lessonId") : undefined
        },
        "metrics":{
          "score": context.get("score") >= 0 ? context.get("score") : undefined,
          "timespent": context.get("timeSpent") >= 0 ? context.get("timeSpent") : undefined
        }
      })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      //'Authorization': 'Token ' + this.get('session.token-api3')
      'Gooru-Session-Token': this.get('session.token-api3')
    };
  },

  defineAuthorizationHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }
});
