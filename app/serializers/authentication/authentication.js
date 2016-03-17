import Ember from 'ember';
import Env from 'gooru-web/config/environment';

export default Ember.Object.extend({

  normalizeResponse: function(payload, isAnonymous) {
    return {
      token: (isAnonymous ? Env['API-3.0']['anonymous-token-api-2.0'] : Env['API-3.0']['user-token-api-2.0']),
      'token-api3': payload['access_token'],
      user: {
        username: payload.username,
        gooruUId: payload['user_id']
      },
      isAnonymous: isAnonymous
    };
  }

});
