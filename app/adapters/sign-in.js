import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({

  namespace: 'rest/v2/account/login',
  apiKey: 'apiKey=ASERTYUIOMNHBGFDXSDWERT123RTGHYT',

  pathForType() {
    return '';
  },

  buildURL: function(record, suffix) {
    return this._super(record, suffix) + '?' + this.apiKey;
  }

});

