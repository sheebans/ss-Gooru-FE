import { moduleFor, test } from 'ember-qunit';


moduleFor('serializer:taxonomy/taxonomy', 'Unit | Serializer | taxonomy/taxonomy');

test('normalizeFetchSubjects', function(assert) {
  const serializer = this.subject();

  const taxonomySubjectsPayload = {
    "subjects": [
      {
        "id": "GUF~Math",
        "title": "Mathematics ",
        "description": "Global Mathematics",
        "code": "GUF mathematics",
        "standard_framework_id": "GUF",
        "frameworks": [
          {
            "standard_framework_id": "TEXS",
            "taxonomy_subject_id": "TEXS~Math",
            "title": "TEXS"
          },
          {
            "standard_framework_id": "CSS",
            "taxonomy_subject_id": "CSS~Math",
            "title": "CSS"
          }
        ]
      },
      {
        "id": "GUF~Science",
        "title": "Science",
        "description": "Science",
        "code": "GUF cience",
        "standard_framework_id": "GUF",
        "frameworks": [
          {
            "standard_framework_id": "TEXS",
            "taxonomy_subject_id": "TEXS~Science",
            "title": "TEXS"
          }
        ]
      }
    ]
  };

  const normalizedSubjects = serializer.normalizeFetchSubjects(taxonomySubjectsPayload);
  assert.equal(normalizedSubjects.length, 2, 'Wrong number of subjects');
  const subject1 = normalizedSubjects.objectAt(0);
  assert.equal(subject1.get('id'), 'GUF~Math', 'Wrong subject1 id');
  // TODO Normalizer test goes here
});
