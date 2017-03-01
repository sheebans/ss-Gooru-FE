import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import Rubric from 'gooru-web/models/rubric/rubric';
import RubricCategory from 'gooru-web/models/rubric/rubric-category';

moduleFor('serializer:rubric/rubric', 'Unit | Serializer | rubric/rubric');

test('serializeCreateRubric', function(assert) {
  const serializer = this.subject();

  serializer.set('taxonomySerializer', Ember.Object.create({
    serializeTaxonomy: function(taxonomy) {
      assert.equal(taxonomy, 'fake-taxonomy', 'Wrong taxonomy');
      return 'taxonomy-serialized';
    }
  }));

  const rubric = Rubric.create({
    title: 'rubric-title',
    description: 'rubric-description',
    type: 'rubric-type',
    thumbnail: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    taxonomy: 'fake-taxonomy',
    audience: [1]
  });

  const rubricObject = serializer.serializeCreateRubric(rubric);
  assert.equal(rubricObject.title, 'rubric-title', 'Wrong title');
  assert.equal(rubricObject.description, 'rubric-description', 'Wrong description');
  assert.equal(rubricObject.type, 'rubric-type', 'Wrong type');
  assert.equal(rubricObject.thumbnail, 'image-id.png', 'Wrong thumbnail');
  assert.equal(rubricObject.taxonomy, 'taxonomy-serialized', 'Wrong taxonomy');
  assert.ok(rubricObject.metadata, 'Missing metadata');
  assert.deepEqual(rubricObject.metadata.audience, [1], 'Wrong audience');

});

test('serializeUpdateRubric uploaded and no feedback required', function(assert) {
  const serializer = this.subject();

  serializer.set('taxonomySerializer', Ember.Object.create({
    serializeTaxonomy: function(taxonomy) {
      assert.equal(taxonomy, 'fake-taxonomy', 'Wrong taxonomy');
      return 'taxonomy-serialized';
    }
  }));

  const rubric = Rubric.create({
    title: 'rubric-title',
    description: 'rubric-description',
    type: 'rubric-type',
    thumbnail: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    taxonomy: 'fake-taxonomy',
    audience: [1],
    url: 'any-url',
    uploaded: true,
    feedback: 'any-feedback',
    totalPoints: 10,
    requiresFeedback: false,
    categories: [
      RubricCategory.create(),
      RubricCategory.create(),
      RubricCategory.create()
    ]
  });

  const rubricObject = serializer.serializeUpdateRubric(rubric);
  assert.equal(rubricObject.title, 'rubric-title', 'Wrong title');
  assert.equal(rubricObject.description, 'rubric-description', 'Wrong description');
  assert.equal(rubricObject.type, 'rubric-type', 'Wrong type');
  assert.equal(rubricObject.thumbnail, 'image-id.png', 'Wrong thumbnail');
  assert.equal(rubricObject.taxonomy, 'taxonomy-serialized', 'Wrong taxonomy');
  assert.ok(rubricObject.metadata, 'Missing metadata');
  assert.deepEqual(rubricObject.metadata.audience, [1], 'Wrong audience');
  assert.equal(rubricObject.url, 'any-url', 'Wrong url');
  assert.equal(rubricObject.is_remote, true, 'Wrong is remote');
  assert.equal(rubricObject.feedback_guidance, 'any-feedback', 'Wrong feedback_guidance');
  assert.equal(rubricObject.total_points, 10, 'Wrong total_points');
  assert.equal(rubricObject.overall_feedback_required, false, 'Wrong overall_feedback_required');
  assert.equal(rubricObject.categories.length, 3, 'Wrong categories length');
});

test('serializeUpdateRubric not uploaded and feedback required', function(assert) {
  const serializer = this.subject();

  serializer.set('taxonomySerializer', Ember.Object.create({
    serializeTaxonomy: function(taxonomy) {
      assert.equal(taxonomy, 'fake-taxonomy', 'Wrong taxonomy');
      return 'taxonomy-serialized';
    }
  }));

  const rubric = Rubric.create({
    title: 'rubric-title',
    description: 'rubric-description',
    type: 'rubric-type',
    thumbnail: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    taxonomy: 'fake-taxonomy',
    audience: [1],
    url: null,
    uploaded: false,
    feedback: null,
    totalPoints: 10,
    requiresFeedback: true
  });

  const rubricObject = serializer.serializeUpdateRubric(rubric);
  assert.equal(rubricObject.title, 'rubric-title', 'Wrong title');
  assert.equal(rubricObject.description, 'rubric-description', 'Wrong description');
  assert.equal(rubricObject.type, 'rubric-type', 'Wrong type');
  assert.equal(rubricObject.thumbnail, 'image-id.png', 'Wrong thumbnail');
  assert.equal(rubricObject.taxonomy, 'taxonomy-serialized', 'Wrong taxonomy');
  assert.ok(rubricObject.metadata, 'Missing metadata');
  assert.deepEqual(rubricObject.metadata.audience, [1], 'Wrong audience');
  assert.equal(rubricObject.url, null, 'Wrong url');
  assert.equal(rubricObject.is_remote, false, 'Wrong is remote');
  assert.equal(rubricObject.feedback_guidance, null, 'Wrong feedback_guidance');
  assert.equal(rubricObject.total_points, 10, 'Wrong total_points');
  assert.equal(rubricObject.overall_feedback_required, true, 'Wrong overall_feedback_required');

});

test('serializeUpdateRubric with empty strings', function(assert) {
  const serializer = this.subject();

  serializer.set('taxonomySerializer', Ember.Object.create({
    serializeTaxonomy: function(taxonomy) {
      assert.equal(taxonomy, 'fake-taxonomy', 'Wrong taxonomy');
      return 'taxonomy-serialized';
    }
  }));

  const rubric = Rubric.create({
    title: '',
    description: '',
    type: 'rubric-type',
    thumbnail: 'http://test-bucket01.s3.amazonaws.com/image-id.png',
    taxonomy: 'fake-taxonomy',
    audience: [1],
    url: '',
    uploaded: false,
    feedback: '',
    totalPoints: 10,
    requiresFeedback: true
  });

  const rubricObject = serializer.serializeUpdateRubric(rubric);
  assert.equal(rubricObject.title, null, 'Wrong title');
  assert.equal(rubricObject.description, null, 'Wrong description');
  assert.equal(rubricObject.type, 'rubric-type', 'Wrong type');
  assert.equal(rubricObject.thumbnail, 'image-id.png', 'Wrong thumbnail');
  assert.equal(rubricObject.taxonomy, 'taxonomy-serialized', 'Wrong taxonomy');
  assert.ok(rubricObject.metadata, 'Missing metadata');
  assert.deepEqual(rubricObject.metadata.audience, [1], 'Wrong audience');
  assert.equal(rubricObject.url, null, 'Wrong url');
  assert.equal(rubricObject.is_remote, false, 'Wrong is remote');
  assert.equal(rubricObject.feedback_guidance, null, 'Wrong feedback_guidance');
  assert.equal(rubricObject.total_points, 10, 'Wrong total_points');
  assert.equal(rubricObject.overall_feedback_required, true, 'Wrong overall_feedback_required');

});

test('serializedUpdateRubricCategory', function(assert) {
  const serializer = this.subject();

  const rubricCategory = RubricCategory.create({
    title: 'any-title',
    narrativeFeedback: 'any-feedback',
    requiresFeedback: true,
    allowsLevels: true,
    allowsScoring: false,
    levels: [
      { name: 'level-1', score: 10},
      { name: 'level-2', score: 11}
    ]
  });

  const categoryObject = serializer.serializedUpdateRubricCategory(rubricCategory);
  assert.equal(categoryObject.category_title, 'any-title', 'Wrong category_title');
  assert.equal(categoryObject.narrative_feedback, 'any-feedback', 'Wrong narrative_feedback');
  assert.equal(categoryObject.required_feedback, true, 'Wrong required_feedback');
  assert.equal(categoryObject.level, true, 'Wrong level');
  assert.equal(categoryObject.scoring, false, 'Wrong scoring');
  assert.equal(categoryObject.levels.length, 2, 'Wrong levels length');
  assert.equal(categoryObject.levels[0].level_name, 'level-1', 'Wrong level name');
  assert.equal(categoryObject.levels[0].level_score, 10, 'Wrong level score');

});

test('serializedUpdateRubricCategory empty properties', function(assert) {
  const serializer = this.subject();

  const rubricCategory = RubricCategory.create({
    title: '',
    narrativeFeedback: ''
  });

  const categoryObject = serializer.serializedUpdateRubricCategory(rubricCategory);
  assert.equal(categoryObject.category_title, null, 'Wrong category_title');
  assert.equal(categoryObject.narrative_feedback, null, 'Wrong narrative_feedback');
});
