import Ember from 'ember';

/**
 * Adapter to support the goal CRUD operations in the API 3.0
 *
 * @typedef {Object} GoalAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: '/api/nucleus/v1/goals',

  /**
   * Posts a new goals
   *
   * @param params - data to send in the request
   * @returns {Ember.Promise|String} ID of the newly created goal
   */
  createGoal: function (params) {
    const namespace = this.get('namespace');
    const url = `${namespace}`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify(params)
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData, textStatus, request) {
          var goalId = request.getResponseHeader('location');
          resolve(goalId);
        }, function (error) {
          reject(error);
        });
    });
  },

  defineHeaders: function () {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
