import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import CollectionModel from 'gooru-web/models/content/collection';

moduleFor('route:reports/collection', 'Unit | Route | reports/collection', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('createContext', function(assert) {
  let route = this.subject();
  const params = {
    classId: 'class-id'
  };
  const collection = CollectionModel.create({
    id: 'collection-id',
    title: 'collection-title',
    isCollection: true,
    courseId: 'course-id',
    unitId: 'unit-id',
    lessonId: 'lesson-id'
  });
  route.set('quizzesContextService', {
    createContext: (context) => {
      assert.equal(context.get('collectionId'), 'collection-id', 'Collection id should match');
      assert.equal(context.get('title'), 'collection-title', 'Collection title should match');
      assert.ok(context.get('isCollection'), 'Should show as collection');
      assert.equal(context.get('contextMapping.courseId'), 'course-id', 'Course id should match');
      assert.equal(context.get('contextMapping.unitId'), 'unit-id', 'Unit id should match');
      assert.equal(context.get('contextMapping.lessonId'), 'lesson-id', 'Lesson id should match');
      return Ember.RSVP.resolve();
    }
  });
  let done = assert.async();
  route.createContext(params, collection).then(done);
});
