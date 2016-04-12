import Ember from 'ember';

/**
 * Adapter to support the Question CRUD operations in the API 3.0
 *
 * @typedef {Object} QuestionAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: '/api/nucleus/v1/questions',

  /**
   * Posts a new question
   *
   * @param data question data to be sent in the request body
   * @returns {Promise}
   */
  createQuestion: function(data) {
    const adapter = this;
    const url = this.get('namespace');
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
   * Reads a question by id
   *
   * @param {string} questionId
   * @returns {Promise}
   */
  readQuestion: function(questionId) {
    const adapter = this;
    const namespace = adapter.get('namespace');
    const url = `${namespace}/${questionId}`;
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
