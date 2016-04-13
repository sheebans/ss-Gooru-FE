import Ember from 'ember';

/**
 * Adapter to support the Profile CRUD operations in the API 3.0
 *
 * @typedef {Object} ProfileAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/profiles',

  usersNamespace: '/api/nucleus-auth/v1/users',

  /**
   * Posts a request to the API to create a new user account
   *
   * @param data user data to be sent in the request body
   * @returns {Promise}
   */
  createProfile: function(data) {
    const adapter = this;
    const url = this.get('usersNamespace');
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Updates the current user Profile data
   *
   * @param data the request body data
   * @returns {Promise}
   */
  updateMyProfile: function(data) {
    const adapter = this;
    const namespace = adapter.get('usersNamespace');
    const url = `${namespace}/me`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify(data.body)
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets the profile information of a given user id
   *
   * @param userId the unique profile user id
   * @returns {Promise}
   */
  readUserProfile: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/demographics`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Follows a user profile
   * @param userId
   * @returns {*|Promise}
   */
  followUserProfile: function (userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/follow`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({"user_id": userId})
    };

    return Ember.$.ajax(url, options);
  },

  /**
   * Unfollows a user profile
   * @param userId
   * @returns {*|Promise}
   */
  unfollowUserProfile: function (userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/unfollow`;
    const options = {
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };

    return Ember.$.ajax(url, options);
  },

  /**
   * Gets resources by user id
   *
   * @param {string} userId
   * @returns {Promise}
   */
  readResources: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/resources`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets questions by user id
   *
   * @param {string} userId
   * @returns {Promise}
   */
  readQuestions: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/questions`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets collections by user id
   *
   * @param {string} userId
   * @returns {Promise}
   */
  readCollections: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/collections`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Gets assessments by user id
   *
   * @param {string} userId
   * @returns {Promise}
   */
  readAssessments: function(userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${userId}/assessments`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },


  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
