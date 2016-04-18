import Ember from 'ember';

/**
 * Adapter to support the Unit CRUD operations in the API 3.0
 *
 * @typedef {Object} UnitAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: '/api/nucleus/v1/courses',

  /**
   * Posts a new unit
   *
   * @param params - data to send in the request
   * @returns {Ember.Promise|String} ID of the newly created unit
   */
  createUnit: function (params) {
    const courseId = params.courseId;
    const namespace = this.get('namespace');
    const url = `${namespace}/${courseId}/units`;
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

  /**
   * Get unit data for the corresponding unit ID
   *
   * @param params - data to send in the request
   * @returns {Promise|Object}
   */
  getUnitById: function (params) {
    const courseId = params.courseId;
    const unitId = params.unitId;
    const namespace = this.get('namespace');
    const url = `${namespace}/${courseId}/units/${unitId}`;
    const options = {
      type: 'GET',
      contentType: 'application/json; charset=utf-8',
      headers: this.defineHeaders()
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options)
        .then(function (responseData) {
          resolve(responseData);
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
