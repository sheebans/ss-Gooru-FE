import Ember from 'ember';
import Env from 'gooru-web/config/environment';

/**
 * Serializer for the Authentication (Login) with API 3.0
 *
 * @typedef {Object} AuthenticationSerializer
 */
export default Ember.Object.extend({

  /**
   *
   * @param payload is the response coming from the endpoint
   * @param isAnonymous indicates if normalization is for an anonymous account
   * @returns {{token, token-api3: *, user: {username: (string|string|string), gooruUId: *}, isAnonymous: *}}
   */
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
