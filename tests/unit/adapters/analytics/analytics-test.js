import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:analytics/analytics', 'Unit | Adapter | analytics/analytics', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('urlForGetCollectionPerformance', function (assert) {
  const adapter = this.subject();
  const query = {
    classId: 'the-class-id',
    courseId: 'the-course-id',
    unitId: 'the-unit-id',
    lessonId: 'the-lesson-id',
    collectionId: 'the-collection-id',
    collectionType: 'the-collection-type'
  };
  const url = adapter.urlForGetCollectionPerformance(query);

  assert.equal(url, '/api/nucleus-insights/v2/class/the-class-id/course/the-course-id/unit/the-unit-id/lesson/the-lesson-id/the-collection-type/the-collection-id/performance', 'Wrong url');
});
