import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import { ASSESSMENT_SUB_TYPES } from 'gooru-web/config/config';
import CollectionModel from 'gooru-web/models/content/collection';
import AssessmentModel from 'gooru-web/models/content/assessment';

moduleFor('serializer:map/course-map', 'Unit | Serializer | map/course-map');

test('normalizeLessonInfo', function(assert) {
  const data = {
    alternate_paths: [
      ASSESSMENT_SUB_TYPES.PRE_TEST,
      ASSESSMENT_SUB_TYPES.POST_TEST,
      ASSESSMENT_SUB_TYPES.BENCHMARK,
      ASSESSMENT_SUB_TYPES.BACKFILL
    ],
    course_path: 'lesson'
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
      return CollectionModel.create({
        title: `normalized-collection-${collection}`,
        collectionSubType: collection
      });
    }
  });
  serializer.set('assessmentSerializer', {
    normalizeReadAssessment: assessment => {
      return AssessmentModel.create({
        title: `normalized-collection-${assessment}`,
        collectionSubType: assessment
      });
    }
  });
  const serializedData = serializer.normalizeLessonInfo(data);
  assert.deepEqual(serializedData.get('title'), 'normalized-lesson', 'Returned data should match');
  assert.deepEqual(serializedData.get('children').length, 4, 'Returned data length should match');
  assert.deepEqual(serializedData.get('children')[0].title, `normalized-collection-${ASSESSMENT_SUB_TYPES.PRE_TEST}`, 'Pre test data should match');
  assert.deepEqual(serializedData.get('children')[1].title, `normalized-collection-${ASSESSMENT_SUB_TYPES.BACKFILL}`, 'Backfill data should match');
  assert.deepEqual(serializedData.get('children')[2].title, `normalized-collection-${ASSESSMENT_SUB_TYPES.POST_TEST}`, 'Post test data should match');
  assert.deepEqual(serializedData.get('children')[3].title, `normalized-collection-${ASSESSMENT_SUB_TYPES.BENCHMARK}`, 'Benchmark data should match');
});
