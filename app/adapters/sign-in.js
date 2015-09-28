import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  namespace: 'rest/v2/account/login',
  apiKey: 'apiKey=ASERTYUIOMNHBGFDXSDWERT123RTGHYT',

  pathForType() {
    return '';
  },

  buildURL: function(record, suffix) {
    //@todo try using header instead of query param, if so we could inject it in all ajax requests
    return this._super(record, suffix) + '?' + this.apiKey;
  }

});

