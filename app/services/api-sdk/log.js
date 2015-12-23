import Ember from 'ember';

/**
 * Log Service
 *
 * Service responsible for sending any type of log data to the server
 * (i.e. errors, stats, events, etc)
 *
 * @module
 *
 * @typedef {Object} LogService
 * @augments Ember/Service
 */
export default Ember.Service.extend({

  /**
   * Send an error report
   * @param error - Ember error
   * @returns {undefined}
   */
  logError: function (error) {
    var timestamp = new Date();

    Ember.Logger.log({
      stack: error.stack,
      when: timestamp
    });
  }

});
