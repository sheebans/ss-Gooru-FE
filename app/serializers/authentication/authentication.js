import Ember from 'ember';
import Env from 'gooru-web/config/environment';
import { DEFAULT_IMAGES } from 'gooru-web/config/config';

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
   * @param accessToken access token to use when it comes from google sign-in
   * @returns {{token, token-api3: *, user: {username: (string|string|string), gooruUId: *, isNew: *},
   *            cdnUrls:{content: *, user: *}, isAnonymous: *}}
   */
  normalizeResponse: function(payload, isAnonymous, accessToken) {
    return {
      token: (isAnonymous ? Env['API-3.0']['anonymous-token-api-2.0'] : Env['API-3.0']['user-token-api-2.0']),
      'token-api3': (accessToken ? accessToken : payload['access_token']),
      user: {
        username: payload.username,
        gooruUId: payload['user_id'],
        avatarUrl: null,
        isNew: payload.user_category ? false : true
      },
      cdnUrls: {
        user: payload.cdn_urls.user_cdn_url,
        content: payload.cdn_urls.content_cdn_url
      },
      isAnonymous: isAnonymous
    };
  },

  /**
   *
   * @param payload is the response coming from the endpoint
   * @returns {{token, token-api3: *, user: {username: (string|string|string), gooruUId: *, avatarUrl: (string), isNew: *},
   *            cdnUrls:{content: *, user: *}, isAnonymous: *}}
   */
  normalizeAvatarUrl: function(payload, session) {
    const basePath = session.cdnUrls.user;
    session.user.avatarUrl = payload['thumbnail_path'] ?
      basePath + payload['thumbnail_path'] : DEFAULT_IMAGES.USER_PROFILE;
    return session;
  },

});
