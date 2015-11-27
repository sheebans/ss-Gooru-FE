import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:user/availability', 'Unit | Adapter | user/availability', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});


test('buildURL querying for email availability', function (assert) {
  let adapter = this.subject({
      "session": {
        "token": 'abc-123'
      }
    }
  );
  const query = {
      keyword: '123@test.com',
      isUsername: false
    },
    url = adapter.buildURL("user/availability", "any id", "any snapshot", "queryRecord", query);

  assert.equal(url, "/gooruapi/rest/v2/user/emailId/availability?sessionToken=abc-123", "Wrong url");
});

test('buildURL querying for username availability', function (assert) {
  let adapter = this.subject({
      "session": {
        "token": 'abc-123'
      }
    }
  );
  const query = {
      keyword: 'test',
      isUsername: true
    },
    url = adapter.buildURL("user/availability", "any id", "any snapshot", "queryRecord", query);

  assert.equal(url, "/gooruapi/rest/v2/user/username/availability?sessionToken=abc-123", "Wrong url"+url);
});
