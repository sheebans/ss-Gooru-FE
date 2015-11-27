import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:unit/unit', 'Unit | Adapter | unit/unit', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});


test('buildURL querying for class and course units', function (assert) {
  let adapter = this.subject({
      "session": {
        "token": 'abc-123'
      }
    }
  );

  const query = {
      classId: '123',
      courseId: '321'
    },
    url = adapter.buildURL("unit/unit", "any id", "any snapshot", "queryRecord", query);

  assert.equal(url, "/gooruapi/rest/v3/class/123/course/321/unit?sessionToken=abc-123", "Wrong url");
});
