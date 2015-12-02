import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:lesson/lesson', 'Lesson | Adapter | lesson/lesson', {
});

test('urlForQueryRecord querying for lessons', function (assert) {
  let adapter = this.subject();

  const
    query = {
      classId: '123',
      courseId: '321',
      unitId: '132'
    },
    url = adapter.urlForQueryRecord(query);

  assert.equal(url, "/gooruapi/rest/v3/class/123/course/321/unit/132/lesson", "Wrong url");
});
