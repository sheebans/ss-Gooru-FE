import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:user-session', 'Unit | Adapter | user-session', {});

test('queryRecord method for user session', function (assert) {
  const adapter = this.subject();

  const query = {
    namespace: '/api/nucleus-insights/v2',
    contentId: 'contentId',
    collectionType: 'collectionType',
    unitId: 'unitId',
    lessonId: 'lessonId',
    userId: 'userId',
    classId: 'classId',
    courseId: 'courseId',
    openSession: 'openSession'
  };

  const url = adapter.generateUrl(query.namespace, query.collectionType, query.contentId, query.userId, query.classId, query.courseId, query.unitId, query.lessonId, query.openSession);
  assert.equal(url, '/api/nucleus-insights/v2/collectionType/contentId/sessions?userUid=userId&classGooruId=classId&courseGooruId=courseId&unitGooruId=unitId&lessonGooruId=lessonId&openSession=openSession', 'Wrong url');
});
