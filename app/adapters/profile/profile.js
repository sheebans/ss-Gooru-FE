import Ember from 'ember';
import SessionMixin from 'gooru-web/mixins/session';

/**
 * Adapter to support the Profile CRUD operations in the API 3.0
 *
 * @typedef {Object} ProfileAdapter
 */
export default Ember.Object.extend(SessionMixin, {

  namespace: '/api/nucleus-auth/v1/users',

  /**
   * Post a request to the API to create a new user account
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

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
