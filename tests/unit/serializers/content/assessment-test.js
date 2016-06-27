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
    thumbnailUrl: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    standards: []
  });
  const response = serializer.serializeCreateAssessment(assessmentObject);
  assert.equal(response.title, 'assessment-title', "Wrong title");
  assert.equal(response.learning_objective, 'any', "Wrong learning objective");
  assert.equal(response.visible_on_profile, true, "Wrong visible on profile");
  assert.equal(response.thumbnail, 'image-id.png', "Wrong thumbnail");
});

test('serializeUpdateAssessment', function(assert) {
  const serializer = this.subject();
  const assessmentObject = AssessmentModel.create({
    title: 'assessment-title',
    learningObjectives: 'any',
    isVisibleOnProfile: false,
    thumbnailUrl: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    standards: [],
    audience: [1],
    depthOfknowledge: [4]
});
  const response = serializer.serializeUpdateAssessment(assessmentObject);
  assert.equal(response.title, 'assessment-title', "Wrong title");
  assert.equal(response.learning_objective, 'any', "Wrong learning objective");
  assert.equal(response.visible_on_profile, false, "Wrong visible on profile");
  assert.equal(response.thumbnail, 'image-id.png', "Wrong thumbnail");
  assert.equal(response.taxonomy, null, "Wrong taxonomy object");
  assert.equal(response.taxonomy, null, "Wrong taxonomy object");
  assert.equal(response['metadata']['audience'][0], 1, 'Wrong audience');
  assert.equal(response['metadata']['depth_of_knowledge'][0], 4, 'Wrong depth_of_knowledge');
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
    thumbnail: 'image-id.png',
    taxonomy: {},
    format: 'assessment-external',
    url: "any",
    "metadata": {
      "audience": [1],
      "depth_of_knowledge": [4]
    }
  };
  const assessment = serializer.normalizeReadAssessment(assessmentData);
  assert.equal(assessment.get('id'), 'assessment-id', 'Wrong id');
  assert.equal(assessment.get('title'), 'assessment-title', 'Wrong title');
  assert.equal(assessment.get('thumbnailUrl'), 'http://test-bucket01.s3.amazonaws.com/image-id.png', 'Wrong image');
  assert.equal(assessment.get('learningObjectives'), 'learning-objectives', 'Wrong learningObjectives');
  assert.equal(assessment.get('isVisibleOnProfile'), true, 'Wrong isVisibleOnProfile');
  assert.equal(assessment.get('standards.length'), 0, 'Wrong standards number of elements');
  assert.equal(assessment.get('format'), 'assessment-external', 'Wrong format');
  assert.equal(assessment.get('url'), 'any', 'Wrong url');
  assert.equal(assessment.get("audience"), 1, 'Wrong audience');
  assert.equal(assessment.get("depthOfknowledge"), 4, 'Wrong depthOfknowledge');
});

test('serializeReorderAssessment', function(assert) {
  const serializer = this.subject();
  const ids = ["a", "b", "c"];
  const data = serializer.serializeReorderAssessment(ids);
  assert.ok(data.order, 'Missing order');
  assert.equal(data.order.length, 3, 'Wrong order total');
  assert.equal(data.order[0].id, "a", 'Wrong id');
  assert.equal(data.order[0].sequence_id, 1, 'Wrong sequence id');
});
