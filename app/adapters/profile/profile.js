import Ember from 'ember';

/**
 * Adapter to support the Profile CRUD operations in the API 3.0
 *
 * @typedef {Object} ProfileAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-auth/v1/users',

  /**
   * Posts a request to the API to create a new user account
   *
   * @param data user data to be sent in the request body
   * @returns {Promise}
   */
  createProfile: function(data) {
    const adapter = this;
    const url = this.get('namespace');
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
   * Gets the current user Profile information
   *
   * @returns {Promise}
   */
  readMyProfile: function() {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/me`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };

    console.log('Calling readMyProfile Adapter', options, url);
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
    const namespace = adapter.get('namespace');
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

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
