import Ember from 'ember';
import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  /**
   * @type {SessionService} Service to retrieve session information
   */
  session: Ember.inject.service('session'),

  /**
   * @type {String}} base url for course map API endpoints
   */
  namespace: '/api/route0/v1',
  /**
   * Method to fetch route0 for given student in class from the API
   * @function fetchInClass
   * @returns {Promise}
   */
  fetchInClass: function(filter) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/rtd?classId=${filter.body.classId}&courseId=${
      filter.body.courseId
    }`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.get('headers')
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Method to fetch route0 for given student in class from the API
   * @function fetchInClass
   * @returns {Promise}
   */
  fetchInClassByTeacher: function(filter) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/rtd/?classId=${filter.classId}&courseId=${
      filter.courseId
    }`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.get('headers'),
      data: filter
    };
    return Ember.$.ajax(url, options);
  },

  updateRouteAction: function(action) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/rtd/status`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.get('headers'),
      data: JSON.stringify(action.body)
    };
    return Ember.$.ajax(url, options);
  }
});
