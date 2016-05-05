import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import AssessmentModel from 'gooru-web/models/content/assessment';

moduleFor('serializer:content/assessment', 'Unit | Serializer | content/assessment');

test('serializeCreateAssessment', function(assert) {
  const serializer = this.subject();
  const assessmentObject = AssessmentModel.create({
    title: 'assessment-title',
    learningObjectives: 'any',
    isVisibleOnProfile: true,
    image: 'http://test-bucket01.s3.amazonaws.com/image-id.png'
  });
  const expected = {
    title: 'assessment-title',
    learning_objective: 'any',
    'visible_on_profile': true,
    thumbnail: 'image-id.png'
  };
  const response = serializer.serializeCreateAssessment(assessmentObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('serializeUpdateAssessment', function(assert) {
  const serializer = this.subject();
  const assessmentObject = AssessmentModel.create({
    title: 'assessment-title',
    learningObjectives: 'any',
    isVisibleOnProfile: false,
    image: 'http://test-bucket01.s3.amazonaws.com/image-id.png'
  });
  const expected = {
    title: 'assessment-title',
    learning_objective: 'any',
    'visible_on_profile': false,
    thumbnail: 'image-id.png'
  };
  const response = serializer.serializeUpdateAssessment(assessmentObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
});

test('normalizeReadAssessment', function(assert) {
  const serializer = this.subject();
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: 'http://test-bucket01.s3.amazonaws.com/'
    }
  }));
  const assessmentData = {
    id: 'assessment-id',
    title: 'assessment-title',
    'learning_objective': 'learning-objectives',
    'visible_on_profile': true,
    thumbnail: 'image-id.png'
  };
  const assessment = serializer.normalizeReadAssessment(assessmentData);
  assert.equal(assessment.get('id'), 'assessment-id', 'Wrong id');
  assert.equal(assessment.get('title'), 'assessment-title', 'Wrong title');
  assert.equal(assessment.get('image'), 'http://test-bucket01.s3.amazonaws.com/image-id.png', 'Wrong image');
  assert.equal(assessment.get('learningObjectives'), 'learning-objectives', 'Wrong learningObjectives');
  assert.equal(assessment.get('isVisibleOnProfile'), true, 'Wrong isVisibleOnProfile');
});
