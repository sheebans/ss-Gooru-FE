import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import CollectionModel from 'gooru-web/models/content/collection';

moduleFor('route:player', 'Unit | Route | player', {
  // Specify the other units that are required for this test.
  // needs: ['controller:foo']
});

test('createContext', function(assert) {
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
      assert.notOk(context.get('contextMapping'), 'Context should not have mapping');
      return Ember.RSVP.resolve();
    }
  });
  let done = assert.async();
  route.createContext(params, collection).then(done);
});
