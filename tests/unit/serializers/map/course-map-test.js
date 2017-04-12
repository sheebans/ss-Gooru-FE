import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:map/course-map', 'Unit | Serializer | map/course-map');

test('normalizeLessonInfo', function(assert) {
  const data = {
    alternate_path: [
      'collection'
    ],
    course_path: 'lesson'
  };
  const expectedData = {
    title: 'normalized-lesson',
    children: [
      'normalized-collection'
    ]
  };
  const serializer = this.subject();
  serializer.set('lessonSerializer', {
    normalizeLesson: lesson => {
      assert.equal(lesson, 'lesson', 'Normalize param should match');
      return Ember.Object.create({
        title: 'normalized-lesson',
        children: []
      });
    }
  });
  serializer.set('collectionSerializer', {
    normalizeReadCollection: collection => {
      assert.equal(collection, 'collection', 'Normalize param should match');
      return 'normalized-collection';
    }
  });
  const serializedData = serializer.normalizeLessonInfo(data);
  assert.deepEqual(serializedData.get('lesson'), expectedData.lesson, 'Returned data should match');
  assert.deepEqual(serializedData.get('children'), expectedData.children, 'Returned data should match');
});
