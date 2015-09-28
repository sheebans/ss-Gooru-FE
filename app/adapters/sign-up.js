import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  namespace: 'rest/v2/user',
  sessionToken: 'sessionToken=9b147580-76df-11e4-8d16-123141016e2a',

  pathForType() {
    return '';
  },

  buildURL: function(record, suffix) {
    return this._super(record, suffix) + '?' + this.sessionToken;
  }

});
