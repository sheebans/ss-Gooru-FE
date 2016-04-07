import { moduleFor, test } from 'ember-qunit';
import Env from 'gooru-web/config/environment';

moduleFor('serializer:authentication/authentication', 'Unit | Serializer | authentication/authentication');

test('normalizeResponse for anonymous account', function(assert) {
  const serializer = this.subject();
  const payload = {
    'access_token': 'token-api-3.0',
    username: 'username',
    'user_id': 'user-id'
  };
  const expected = {
    token: Env['API-3.0']['anonymous-token-api-2.0'],
    'token-api3': 'token-api-3.0',
    user: {
      username: 'username',
      gooruUId: 'user-id'
    },
    isAnonymous: true
  };
  const response = serializer.normalizeResponse(payload, true);
  assert.deepEqual(expected, response, 'Wrong normalized response');
});

test('normalizeResponse for normal account', function(assert) {
  const serializer = this.subject();
  const payload = {
    'access_token': 'token-api-3.0',
    username: 'username',
    'user_id': 'user-id'
  };
  const expected = {
    token: Env['API-3.0']['user-token-api-2.0'],
    'token-api3': 'token-api-3.0',
    user: {
      username: 'username',
      gooruUId: 'user-id'
    },
    isAnonymous: false
  };
  const response = serializer.normalizeResponse(payload, false);
  assert.deepEqual(expected, response, 'Wrong normalized response');
});

test('normalizeResponse for google account', function(assert) {
  const serializer = this.subject();
  const payload = {
    username: 'username',
    'user_id': 'user-id'
  };
  const expected = {
    token: Env['API-3.0']['user-token-api-2.0'],
    'token-api3': 'token-api-3.0',
    user: {
      username: 'username',
      gooruUId: 'user-id'
    },
    isAnonymous: false
  };
  const response = serializer.normalizeResponse(payload, false, 'token-api-3.0');
  assert.deepEqual(expected, response, 'Wrong normalized response');
});
