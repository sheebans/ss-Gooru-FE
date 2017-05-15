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

  const rubric = Rubric.create(Ember.getOwner(this).ownerInjection(),{
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

test('normalizeRubricCategory', function(assert) {
  const serializer = this.subject();

  const category = {
    "category_title": "Thesis and Sub-claims",
    "narrative_feedback": "any feedback",
    "required_feedback": true,
    "level": true,
    "scoring": false,
    "levels": [
      {
        "level_name": "Exemplary",
        "level_score": 4
      },
      {
        "level_name": "Proficient",
        "level_score": 3
      },
      {
        "level_name": "Basic",
        "level_score": 2
      },
      {
        "level_name": "Below Basic",
        "level_score": 1
      }
    ]
  };

  const rubricCategory = serializer.normalizeRubricCategory(category);
  assert.equal(rubricCategory.get('title'), 'Thesis and Sub-claims', 'Wrong title');
  assert.equal(rubricCategory.get('narrativeFeedback'), 'any feedback', 'Wrong feedback');
  assert.equal(rubricCategory.get('requiresFeedback'), true, 'Wrong requiresFeedback');
  assert.equal(rubricCategory.get('allowsLevels'), true, 'Wrong allowsLevels');
  assert.equal(rubricCategory.get('allowsScoring'), false, 'Wrong allowsScoring');
  assert.equal(rubricCategory.get('levels.length'), 4, 'Wrong allowsScoring');
  assert.equal(rubricCategory.get('levels')[0].name, 'Exemplary', 'Wrong level name');
  assert.equal(rubricCategory.get('levels')[0].score, 4, 'Wrong level score');
});

test('normalizeRubric', function(assert) {
  const serializer = this.subject();
  const contentCdnUrl = 'content-url/';
  serializer.set('session', Ember.Object.create({
    'cdnUrls': {
      content: contentCdnUrl
    }
  }));

  const rubricData = {
    "id": "2c185398-d0e6-42d8-9926-572939fc0784",
    "title": "Rubric - 1",
    "description": "This is the example question for the rubrics association",
    "type": "1xN",
    "thumbnail": "2c185398-d0e6-42d8-9926-572939fc0784.png",
    "metadata": {
      "audience": [12, 45]
    },
    "taxonomy": {},
    "url": "https://en.wikipedia.org/wiki/Rubric_(academic)",
    "is_remote": true,
    "feedback_guidance": "Summarize your feedback on the essay as a whole",
    "total_points": 4,
    "overall_feedback_required": true,
    "categories": [{
        "category_title": "Thesis and Sub-claims"
      },
      {
        "category_title": "Thesis and Sub-claims"
      }
    ]
  };

  const rubric = serializer.normalizeRubric(rubricData);
  assert.equal(rubric.get('id'), '2c185398-d0e6-42d8-9926-572939fc0784', 'Wrong id');
  assert.equal(rubric.get('title'), 'Rubric - 1', 'Wrong title');
  assert.equal(rubric.get('description'), 'This is the example question for the rubrics association', 'Wrong description');
  assert.equal(rubric.get('type'), '1xN', 'Wrong type');
  assert.equal(rubric.get('thumbnail'), contentCdnUrl + '2c185398-d0e6-42d8-9926-572939fc0784.png', 'Wrong thumbnail');
  assert.deepEqual(rubric.get('audience'), [12, 45], 'Wrong audience');
  assert.equal(rubric.get("taxonomy.length"), 0, 'Wrong taxonomy');
  assert.equal(rubric.get('url'), 'https://en.wikipedia.org/wiki/Rubric_(academic)', 'Wrong url');
  assert.equal(rubric.get('uploaded'), true, 'Wrong url');
  assert.equal(rubric.get('feedback'), 'Summarize your feedback on the essay as a whole', 'Wrong feedback');
  assert.equal(rubric.get('totalPoints'), 4, 'Wrong total points');
  assert.equal(rubric.get('requiresFeedback'), true, 'Wrong requires feedback');
  assert.equal(rubric.get('categories.length'), 2, 'Wrong categories length');
});
