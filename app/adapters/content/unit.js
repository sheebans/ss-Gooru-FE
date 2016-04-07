import Ember from 'ember';

/**
 * Adapter to support the Unit CRUD operations in the API 3.0
 *
 * @typedef {Object} UnitAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service('session'),

  namespace: function (courseId) {
    return `/api/nucleus/v1/courses/${courseId}/units`
  },

  /**
   * Posts a new unit
   *
   * @param params - data to send in the request
   * @returns {Ember.Promise}
   */
  createUnit: function (params) {
    const courseId = params.courseId;
    const url = this.get('namespace')(courseId);
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'text',
      processData: false,
      headers: this.defineHeaders(),
      data: JSON.stringify(params.unit)
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData, textStatus, request) {
          var unitId = request.getResponseHeader('location');
          resolve(unitId);
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
