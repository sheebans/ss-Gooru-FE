import Ember from 'ember';

/**
 * Adapter to support the rubric CRUD operations in the API 3.0
 *
 * @typedef {Object} RubricAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: '/api/nucleus/v2/rubrics',

  profileNamespace: '/api/nucleus/v2/profiles',

  copierNamespace: '/api/nucleus/v2/copier',

  questionsNamespace: '/api/nucleus/v2/questions',

  gradingNamespace: '/api/nucleus-insights/v2/rubrics',

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
        }, reject);
    });
  },

  /**
   * Posts a new rubric off
   *
   * @param data - rubric off data to be sent in the request body
   * @returns {Promise}
   */
  createRubricOff: function(data) {
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

  /**
   * Gets the rubric information
   *
   * @param {string} rubricId
   * @returns {Promise|Object}
   */
  getRubric: function (rubricId) {
    const namespace = this.get('namespace');
    const url = `${namespace}/${rubricId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders()
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData) {
          resolve(responseData);
        }, reject);
    });
  },

  /**
   * Gets the user rubrics information
   * @param {string} userId
   * @returns {Promise|Object}
   */
  getUserRubrics: function (userId) {
    const profileNamespace = this.get('profileNamespace');
    const url = `${profileNamespace}/${userId}/rubrics`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders()
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData) {
          resolve(responseData);
        }, reject);
    });
  },

  /**
   * Copies a rubric
   *
   * @param {string} rubricId to be copied
   * @returns {Ember.Promise|String} ID of the copied rubric
   */
  copyRubric: function (rubricId) {
    const copierNamespace = this.get('copierNamespace');
    const url = `${copierNamespace}/rubrics/${rubricId}`;
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify({}) //empty body is required
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData, textStatus, request) {
          var rubricId = request.getResponseHeader('location');
          resolve(rubricId);
        }, reject);
    });
  },

  /**
   * Associates a rubric with a question
   *
   * @param {string} rubricId
   * @param {string} questionId
   * @returns {Ember.Promise|boolean} true when successful
   */
  associateRubricToQuestion: function (rubricId, questionId) {
    const questionsNamespace = this.get('questionsNamespace');
    const url = `${questionsNamespace}/${questionId}/rubrics/${rubricId}`;
    const options = {
      type: 'PUT',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify({}) //empty body is required
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function () {
          resolve(true);
        }, reject);
    });
  },

  /**
   * Gets Questions pending grading
   *
   * @param {string} userId
   * @param {string} classId
   * @param {string} courseId
   * @returns {Promise/Object}
   */
  getQuestionsToGrade: function(userId, classId, courseId) {
    const adapter = this;
    const namespace = adapter.get('gradingNamespace');
    const url = `${namespace}/questions`;

    var data = {
      userId,
      classId,
      courseId
    };

    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      data,
      headers: adapter.defineHeaders()
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function () {
    return {
      'Authorization': 'Token ' + this.get('session.token-api3')
    };
  }

});
