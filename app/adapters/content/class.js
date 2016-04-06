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
   * Gets the class information of a given class id
   * @param classId
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

  defineHeaders: function() {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
