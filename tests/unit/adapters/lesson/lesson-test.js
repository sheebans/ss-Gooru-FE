import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:lesson/lesson', 'Lesson | Adapter | lesson/lesson', {
});


test('buildURL querying for class,course and unit lessons', function (assert) {
  let adapter = this.subject({
      "session": {
        "token": 'abc-123'
      }
    }
  );

  const query = {
      classId: '123',
      courseId: '321',
      unitId: '132'
    },
    url = adapter.buildURL("lesson/lesson", "any id", "any snapshot", "queryRecord", query);

  assert.equal(url, "/gooruapi/rest/v3/class/123/course/321/unit/132/lesson?sessionToken=abc-123", "Wrong url");
});
