import Ember from 'ember';

/**
 * Adapter to support the map operations
 *
 * @typedef {Object} MapAdapter
 */
export default Ember.Object.extend({

  session: Ember.inject.service(),

  namespace: '/api/navigate-map/v1',

  /**
   * Calls the next map navigation api
   *
   * @param {*} userId
   * @returns {Promise|Object}
   */
  next: function (context) {
    const namespace = this.get('namespace');
    const url = `${namespace}/next`;
    const options = {
      type: "POST",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      headers: this.defineHeaders(),
      data: JSON.stringify(context)
    };

    return new Ember.RSVP.Promise(function (resolve, reject) {
      Ember.$.ajax(url, options).then(resolve, reject);
    });
  },

  defineHeaders: function () {
    return {
      'Authorization': `Token ${this.get('session.token-api3')}`
    };
  }

});
