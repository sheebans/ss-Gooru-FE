import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:performance/student-performance', 'Unit | Adapter | performance/student-performance', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('urlForQueryRecord querying student-performance for units', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    courseId: 'the-course-id'
  };
  const url = adapter.urlForQueryRecord(query);

  assert.equal(url, '/insights/api/v1/class/the-class-id/course/the-course-id/progress', 'Wrong url');
});
