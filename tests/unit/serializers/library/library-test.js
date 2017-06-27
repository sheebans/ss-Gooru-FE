import { moduleFor, test } from 'ember-qunit';

moduleFor('serializer:library/library', 'Unit | Serializer | library/library');

test('normalizeFetchLibraries', function(assert) {
  const serializer = this.subject();
  const librariesPayload = {
    "libraries": [{
      "id": 'library-id-1',
      "name": "name-1",
      "thumbnail": "thumbnail-1",
      "tenant": "tenant-1",
      "tenant_root": null,
      "course_count": 5,
      "assessment_count": 12,
      "collection_count": 15,
      "resource_count": 56,
      "question_count": 45,
      "rubric_count": 12,
      "sequence_id": 1,
      "taxonomy": null
    }, {
      "id": 'library-id-2',
      "name": "name-2",
      "thumbnail": "thumbnail-2",
      "tenant": "tenant-2",
      "tenant_root": null,
      "course_count": 7,
      "assessment_count": 10,
      "collection_count": 9,
      "resource_count": 46,
      "question_count": 51,
      "rubric_count": 9,
      "sequence_id": 2,
      "taxonomy": null
    }]
  };
  const normalizedLibraries = serializer.normalizeFetchLibraries(librariesPayload);

  assert.equal(normalizedLibraries.length, 2, 'Wrong number of libraries');
  const library1 = normalizedLibraries.objectAt(0);

  assert.equal(library1.get('id'), 'library-id-1', 'Wrong library id');
  assert.equal(library1.get('name'), 'name-1', 'Wrong library name');
  assert.equal(library1.get('image'), 'thumbnail-1', 'Wrong image name');
  assert.equal(library1.get('tenantId'), 'tenant-1', 'Wrong tenant id');
  assert.equal(library1.get('tenantRoot'), null, 'Should be null');
  assert.equal(library1.get('courseCount'), 5, 'Wrong course count');
  assert.equal(library1.get('assessmentCount'), 12, 'Wrong assessment count');
  assert.equal(library1.get('collectionCount'), 15, 'Wrong collection count');
  assert.equal(library1.get('resourceCount'), 56, 'Wrong resource count');
  assert.equal(library1.get('questionCount'), 45, 'Wrong question count');
  assert.equal(library1.get('rubricCount'), 12, 'Wrong rubric count');
  assert.equal(library1.get('sequence'), 1, 'Wrong sequence');
  assert.equal(library1.get('taxonomy'), null, 'Should be null');

});
