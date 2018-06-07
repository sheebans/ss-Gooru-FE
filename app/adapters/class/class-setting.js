import Ember from 'ember';

/**
 *
 * Adapter to support the class setting update operations
 *
 * @typedef {Object} ClassSettingAdapter
 */
export default Ember.Object.extend({
  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v2/classes',

  /**
   * Update Rescope class setting
   *
   * @param {String} classId
   * @param {Boolean} rescope
   * @returns {Promise}
   */
  updateRescopeClassSetting: function(classId, rescope) {
    const adapter = this;
    const namespace = this.get('namespace');
    const url = `${namespace}/${classId}/settings/rescope`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: adapter.defineHeaders(),
      data: JSON.stringify({
        rescope: rescope
      })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function() {
    return {
      Authorization: `Token ${this.get('session.token-api3')}`
    };
  }
});
