import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:performance/student-lesson-performance', 'Unit | Adapter | performance/student-lesson-performance', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('urlForQueryRecord querying student-performance for lessons with collection/assessments', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    courseId: 'the-course-id',
    unitId: 'the-unit-id'
  };
  const url = adapter.urlForQueryRecord(query);

  assert.equal(url, '/insights/api/v1/class/the-class-id/course/the-course-id/unit/the-unit-id/progress', 'Wrong url');
});
