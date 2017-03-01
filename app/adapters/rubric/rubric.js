import Ember from 'ember';

/**
 * Adapter to support the rubric CRUD operations in the API 3.0
 *
 * @typedef {Object} RubricAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: '/api/nucleus/v2/rubrics',

  /**
   * Posts a new rubric
   *
   * @param params - data to send in the request
   * @returns {Ember.Promise|String} ID of the newly created rubric
   */
  createRubric: function (params) {
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
          var rubricId = request.getResponseHeader('location');
          resolve(rubricId);
        }, function (error) {
          reject(error);
        });
    });
  },

  /**
   * Updates a rubric
   *
   * @param params - data to send in the request
   * @returns {Ember.Promise|Boolean} true when updated
   */
  updateRubric: function (params, rubricId) {
    const namespace = this.get('namespace');
    const url = `${namespace}/${rubricId}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify(params)
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function () {
          resolve(true);
        }, reject);
    });
  },

  /**
   * Deletes a rubric
   *
   * @param params - data to send in the request
   * @returns {Ember.Promise|boolean} true when deleted
   */
  deleteRubric: function (rubricId) {
    const namespace = this.get('namespace');
    const url = `${namespace}/${rubricId}`;
    const options = {
      type: 'DELETE',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders()
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function () {
          resolve(true);
        }, reject);
    });
  },

  defineHeaders: function () {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
