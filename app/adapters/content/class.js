import Ember from 'ember';

/**
 * Adapter to support the Class CRUD operations in the API 3.0
 *
 * @typedef {Object} ClassAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/classes',

  /**
   * Posts a new class
   *
   * @param data class data to be sent in the request body
   * @returns {Promise}
   */
  createClass: function(data) {
    const adapter = this;
    const url = adapter.get('namespace');
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Join class
   *
   * @param {string} code class code
   * @returns {Promise}
   */
  joinClass: function(code) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${code}/members`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({}) //empty body is required by the BE
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the list of classes for a user
   * @returns {Promise}
   */
  getMyClasses: function() {
    const adapter = this;
    const url = adapter.get('namespace');
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the class information of a given class id
   * @param classId the class ID to be read
   * @returns {Promise}
   */
  readClassInfo: function(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get the list of members, invitees, collaborators and owner of the class
   * @param classId the class ID to be read
   * @returns {Promise}
   */
  readClassMembers: function(classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/members`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Associates a Course with a Class
   *
   * @param classId the class id
   * @param courseId the course id
   * @returns {Promise}
   */
  associateCourseToClass: function(courseId, classId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${classId}/courses/${courseId}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({})
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Creates the headers required by API 3.0
   * @returns {{Authorization: string}}
   */
  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
