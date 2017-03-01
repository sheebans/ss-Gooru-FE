import Ember from 'ember';
import { moduleFor, test } from 'ember-qunit';
import Rubric from 'gooru-web/models/rubric/rubric';

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
