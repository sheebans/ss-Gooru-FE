import Ember from 'ember';
import Env from 'gooru-web/config/environment';

export default Ember.Object.extend({

  namespace: '/api/nucleus-auth/v1/token',

  postAuthentication: function(data) {
    const adapter = this;
    const url = this.get('namespace');
    const options = {
      type: 'POST',
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
      processData: false,
      headers: adapter.defineHeaders(data),
      data: JSON.stringify({
        'client_key': Env['API-3.0'].clientKey,
        'client_id': Env['API-3.0'].clientId,
        'grant_type': (data.isAnonymous ? 'anonymous' : 'credential')
      })
    };
    return Ember.$.ajax(url, options);
  },

  defineHeaders: function(data) {
    if (data.isAnonymous) {
      return {};
    } else {
      return {
        'Authorization': 'Basic ' + btoa(data.username + ':' + data.password)
      };
    }
  }

});
