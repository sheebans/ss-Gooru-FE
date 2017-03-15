import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { ROLES } from 'gooru-web/config/config';
import CollectionModel from 'gooru-web/models/content/collection';

moduleFor('route:context-player', 'Unit | Route | context player', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('createContext as teacher', function(assert) {
  let route = this.subject();
  const params = {
    classId: 'class-id',
    courseId: 'course-id',
    unitId: 'unit-id',
    lessonId: 'lesson-id'
  };
  const collection = CollectionModel.create({
    id: 'collection-id',
    title: 'collection-title',
    isCollection: true
  });
  route.set('quizzesContextService', {
    createContext: (context) => {
      assert.equal(context.get('collectionId'), 'collection-id', 'Collection id should match');
      assert.equal(context.get('title'), 'collection-title', 'Collection title should match');
      assert.ok(context.get('isCollection'), 'Should show as collection');
      assert.deepEqual(context.get('contextMapping'), {}, 'Context should not have mapping');
      return Ember.RSVP.resolve();
    }
  });
  let done = assert.async();
  route.createContext(params, collection).then(done);
});

test('createContext as student', function(assert) {
  let route = this.subject();
  const params = {
    classId: 'class-id',
    courseId: 'course-id',
    unitId: 'unit-id',
    lessonId: 'lesson-id',
    role: ROLES.STUDENT
  };
  const collection = CollectionModel.create({
    id: 'collection-id',
    title: 'collection-title',
    isCollection: false
  });
  route.set('quizzesContextService', {
    createContext: (context) => {
      assert.equal(context.get('collectionId'), 'collection-id', 'Collection id should match');
      assert.equal(context.get('title'), 'collection-title', 'Collection title should match');
      assert.notOk(context.get('isCollection'), 'Should show as collection');
      assert.equal(context.get('classId'), 'class-id', 'Class id should match');
      assert.equal(context.get('contextMapping.courseId'), 'course-id', 'Course id should match');
      assert.equal(context.get('contextMapping.unitId'), 'unit-id', 'Unit id should match');
      assert.equal(context.get('contextMapping.lessonId'), 'lesson-id', 'Lesson id should match');
      return Ember.RSVP.resolve();
    }
  });
  let done = assert.async();
  route.createContext(params, collection).then(done);
});
