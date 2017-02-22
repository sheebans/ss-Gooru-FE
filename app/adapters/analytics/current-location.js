import Ember from 'ember';

/**
 * Adapter to get the User's Current Location
 *
 * @typedef {Object} CurrentLocationAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus-insights/v2',

  getUserCurrentLocation: function(classId, userId) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/class/${classId}/user/${userId}/current/location`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  /**
   * Get user location in class provided
   * @param {string[]} classIds
   * @param {string} userId
   * @returns {*}
     */
  getUserCurrentLocationByClassIds: function(classIds, userId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/classes/location`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify({
        "classIds" : classIds
      })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      'gooru-session-token': this.get('session.token-api3')
    };
  }

});
