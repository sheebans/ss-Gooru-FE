import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:unit/unit', 'Unit | Adapter | unit/unit', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});


test('urlForQueryRecord querying for class and course units', function (assert) {
  let adapter = this.subject();

  const
    query = {
      classId: '123',
      courseId: '321'
    },
    url = adapter.urlForQueryRecord(query);

  assert.equal(url, "/gooruapi/rest/v3/class/123/course/321/unit", "Wrong url");
});
