import { moduleFor, test } from 'ember-qunit';
import ClassModel from 'gooru-web/models/content/class';

moduleFor('serializer:content/class', 'Unit | Serializer | content/class');

test('serializeCreateClass', function(assert) {
  const serializer = this.subject();
  const classObject = ClassModel.create({
    title: 'class-title',
    classSharing: 'open'
  });
  const expected = {
    title: 'class-title',
    class_sharing: 'open'
  };
  const response = serializer.serializeCreateClass(classObject);
  assert.deepEqual(expected, response, 'Wrong serialized response');
moduleFor('serializer:content/class', 'Unit | Serializer | content/profile');

test('normalizeReadProfile', function(assert) {
  const serializer = this.subject();
  const classPayload = {
    "id": "d44d3928-2623-4925-9d38-e933650a7573",
    "creator_id": "327598a1-109a-4bcc-be9a-357981711381",
    "title": "My Class 1",
    "description": 'Class description',
    "greeting": 'Greeting message',
    "grade": null,
    "class_sharing": "open",
    "cover_image": 'image-name',
    "code": "ABC123",
    "min_score": 10,
    "end_date": "2016-01-01",
    "course_id": "d44d3928-2623-4925-9d38-e933650a7573",
    "collaborator": null,
    "gooru_version": 3,
    "content_visibility": null,
    "is_archived": false
  };
  const expected = ClassModel.create({
    id: 'd44d3928-2623-4925-9d38-e933650a7573',
    code: 'ABC123',
    title: 'My Class 1',
    description: 'Class description',
    greeting: 'Greeting message',
    grade:[],
    classSharing: 'open',
    coverImage: 'image-name',
    minScore: 10,
    endDate: '2016-01-01',
    collaborator: [],
    creatorSystem: ''
  });
  const normalizedClassInfo = serializer.normalizeReadClassInfo(classPayload);
  assert.deepEqual(expected, normalizedClassInfo, 'Wrong normalized response');
});
