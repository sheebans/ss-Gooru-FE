import Ember from 'ember';

/**
 * Adapter to support the goal CRUD operations in the API 3.0
 *
 * @typedef {Object} GoalAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: '/api/nucleus-insights/v2',

  /**
   * Gets user goals
   *
   * @param {string} userId
   * @param {string[]} classIds
   * @returns {Promise}
   */
  findClassPerformanceSummaryByClassIds: function (userId, classIds) {
    const namespace = this.get('namespace');
    const url = `${namespace}/classes/performance?userId=${userId}`;
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
    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData) {
          resolve(responseData);
        }, reject);
    });
  },

  defineHeaders: function () {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
